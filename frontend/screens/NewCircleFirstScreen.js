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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';

import { LandingStyles } from '../constants/Styles';

const styles = LandingStyles;

const frequency = [
  {
    label: 'once a month',
    value: 'once_per_month',
  },
  {
    label: 'twice a month',
    value: 'twice_per_month',
  },
  {
    label: 'once a week',
    value: 'once_per_week',
  },
];

export default class NewCircleFirstScreen extends React.Component {
  state = {
    amount: '',
    frequency: '',
    length: ''
  };

  componentWillMount() {
    const user = this.props.navigation.getParam('user');
    this.setState({ executor: user.url });
  }


  render() {
    const placeholder = {
      label: 'Rules',
      value: null,
      color: '#9EA0A4',
    };
      return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}>

          <View style={styles.container}>

            <Text>How much will members save in each pay period</Text>

            <TextInput 
              style={styles.body}
              value={this.state.amount}
              onChangeText={(text) => this.setState({ amount: text })}/>
            
            <Text>How often would members save this amount together?</Text>
            <RNPickerSelect
              placeholder={placeholder}
              items={frequency}
              onValueChange={value => {
                this.setState({
                  frequency: value,
                });
              }}
              style={pickerSelectStyles}
              value={this.state.frequency}
            />

            <Text>How long would members agree to be a part of this circle?</Text>
            <TextInput 
              style={styles.body}
              value={this.state.length}
              onChangeText={(text) => this.setState({ length: text })}/>

            <TouchableOpacity 
              style={styles.loginContainer}
              onPress={() => this.props.navigation.navigate('Rules', {
                amount: this.state.amount,
                frequency: this.state.frequency,
                length: this.state.length
              })}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Continue</Text>
                </View>
            </TouchableOpacity>


          </View>

      </KeyboardAwareScrollView>
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