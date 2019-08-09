import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

export default class RecordPaymentScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Who, how much, how, etc</Text>
        <TextInput />
        <Text>
          You will have a chane to review the members, rules, 
          and obligations of the circle before you officially join!
        </Text>
        <Button 
          title='View this Circle' 
        />
      </View>
    );
  }
}