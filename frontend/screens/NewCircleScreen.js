import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
  Button,
  StyleSheet,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements'

import { LandingStyles } from '../constants/Styles';
import { createCircle } from '../actions/circle'

const styles = LandingStyles;

export class NewCircleScreen extends React.Component {
  state = {
    name: '',
    votingRules: '',
    lendingRules: '',
    startDate: new Date(),
    amount: '',
    frequency: '',
    length: '',
    isDateTimePickerVisible: false,
    isChecked: false,
    executor: null
  };

  static propTypes = {
    createCircle: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    newCircleSuccess: PropTypes.bool,
    circle: PropTypes.object
  };

  handleDatePicked = date => {
    this.setState({ startDate: date });
    this.hideDateTimePicker();
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  componentWillMount() {
    const user = this.props.navigation.dangerouslyGetParent().getParam('user');
    const amount = this.props.navigation.getParam('amount');
    const frequency = this.props.navigation.getParam('frequency');
    const length = this.props.navigation.getParam('length');
    this.setState({ 
      executor: user.url,
      amount: amount,
      frequency: frequency,
      length: length
    });
  }

  onSubmit() {
    const 
    { name, 
      votingRules, 
      lendingRules, 
      startDate, 
      executor, 
      amount,
      frequency, 
      length} = this.state;
    if (!this.state.isChecked) {
      Alert.alert('Submit failed:', 'You have not checked the box yet')
    } else {
      this.props.createCircle(
        name, 
        executor,
        votingRules, 
        lendingRules,
        amount,
        frequency,
        length,
        startDate.toISOString().substr(0, 10)
      );
    }
  }

  componentDidUpdate() {
    if (this.props.newCircleSuccess) {
      this.props.navigation.navigate('Add', {
        user: this.props.navigation.getParam('user', 'none'),
        circle: this.props.circle
      });
    }
  }

  render() {
      return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}>

          <View style={styles.container}>

            <Text>What should we call your circle</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                />
            </View>

            <Text>When will you start saving?</Text>
            <Text>
              Date: {this.state.startDate.toString().substr(4, 12)}
            </Text>
            <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
              <DateTimePicker
                minimumDate={this.state.startDate}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
            />

            <Text>All loans are approved by groupd vote. 
              How many members are need for a loan to pass?</Text>
            <TextInput
              style={styles.body}
              value={this.state.votingRules}
              onChangeText={(text) => this.setState({ votingRules: text })}
            />

            <CheckBox
              title='I have read and agreed with the following agreement'
              checked={this.state.isChecked}
              onPress={() => this.setState({isChecked: !this.state.isChecked})}
            />
            <Button
              onPress={() => {
                //on clicking we are going to open the URL using Linking
                Linking.openURL('http://umbrelasavings.org/');
              }}
              title='User Agreement'/>
            
            <TouchableOpacity 
              disabled={!this.state.isChecked}
              style={styles.loginContainer}
              onPress={() => this.onSubmit()}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Submit</Text>
                </View>
            </TouchableOpacity>

          </View>

      </KeyboardAwareScrollView>
      );
      }

}

const mapStateToProps = state => ({
  isLoading: state.circle.isLoading,
  newCircleSuccess: state.circle.newCircleSuccess,
  circle: state.circle.circle
});

export default connect(mapStateToProps, { createCircle }) (NewCircleScreen);