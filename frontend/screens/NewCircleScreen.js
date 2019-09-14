import React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Switch,
  TextInput,
  Button,
  StyleSheet,
  Linking,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements'

import { HomeStyles } from '../constants/Styles';
import KeyboardShift from '../components/Keyboard';
import { createCircle } from '../actions/circle'

const styles = HomeStyles;

const sports = [
  {
    label: 'Turn',
    value: 't',
  },
  {
    label: 'TurnShare',
    value: 'ts',
  },
  {
    label: 'Vote',
    value: 'v',
  },
];

export class NewCircleScreen extends React.Component {
  state = {
    name: '',
    votingRules: '',
    savingRules: '',
    startDate: new Date(),
    isActive: true,
    isDateTimePickerVisible: false,
    isChecked: false
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

  onSubmit() {
    const {name, votingRules, savingRules, startDate, isActive} = this.state;
    if (!this.state.isChecked) {
      Alert.alert('Submit failed:', 'You have not checked the box yet')
    } else {
      this.props.createCircle(
        name,
        votingRules,
        savingRules,
        startDate.toISOString().substr(0, 10),
        isActive);
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
    const placeholder = {
      label: 'Rules',
      value: null,
      color: '#9EA0A4',
    };
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={true}>

          <View style={styles.container}>
            <Text style={styles.baseText}>
              What should we call your circle?
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                  style={styles.body}
                  maxLength={20}
                  value={this.state.name}
                  placeholder='Team Name'
                  onChangeText={(text) => this.setState({ name: text })}
                  />
            </View>
            <Text style={styles.fineText}>
              Characters Left: {this.state.name.length}/20
            </Text>

            <Text style={styles.baseText}>
              When will you start saving?
            </Text>
            <Text style={styles.fineText}>
              Date: {this.state.startDate.toString().substr(4, 12)}
            </Text>

            <Button
              title="Pick a Start Date"
              color="#16D1A4"
              onPress={this.showDateTimePicker} />
              <DateTimePicker
                minimumDate={this.state.startDate}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
            />

            <Text style={styles.baseText}>
              How should loans work for your circle?
            </Text>

            <RNPickerSelect
              placeholder={placeholder}
              items={sports}
              onValueChange={value => {
                this.setState({
                  votingRules: value,
                });
              }}
                style={pickerSelectStyles}
                value={this.state.votingRules}
              />

              <Text>Saving Rules</Text>
              <RNPickerSelect
                placeholder={placeholder}
                items={sports}
                onValueChange={value => {
                  this.setState({
                    savingRules: value,
                  });
                }}
                style={pickerSelectStyles}
                value={this.state.savingRules}
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
    return (
      <KeyboardShift>
        {() => (
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.baseText}>
            What should we call your circle?
          </Text>
          <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                maxLength={20}
                value={this.state.name}
                placeholder='Team Name'
                onChangeText={(text) => this.setState({ name: text })}
                />
          </View>
          <Text style={styles.fineText}>
            Characters Left: {this.state.name.length}/20
          </Text>

          <Text style={styles.baseText}>
            When will you start saving?
          </Text>
          <Text style={styles.fineText}>
            Date: {this.state.startDate.toString().substr(4, 12)}
          </Text>

          <Button
            title="Pick a Start Date"
            color="#16D1A4"
            onPress={this.showDateTimePicker} />
            <DateTimePicker
              minimumDate={this.state.startDate}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
          />

          <Text style={styles.baseText}>
            How should loans work for your circle?
          </Text>

          <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                votingRules: value,
              });
            }}
              style={pickerSelectStyles}
              value={this.state.votingRules}
            />

            <Text>Saving Rules</Text>
            <RNPickerSelect
              placeholder={placeholder}
              items={sports}
              onValueChange={value => {
                this.setState({
                  savingRules: value,
                });
              }}
              style={pickerSelectStyles}
              value={this.state.savingRules}
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
          </ScrollView>
        )}
      </KeyboardShift>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = state => ({
  isLoading: state.circle.isLoading,
  newCircleSuccess: state.circle.newCircleSuccess,
  circle: state.circle.circle
});

export default connect(mapStateToProps, { createCircle }) (NewCircleScreen);
