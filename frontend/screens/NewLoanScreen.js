import React from 'react';
import {
  View,
  Button,
  TextInput,
  Text
} from 'react-native'

export default class NewLoanScreen extends React.Component {
  render() {
    return (
      <View>
      <Text>How much would you like to request from the group</Text>
      <TextInput />
      <Text>Note that you can't request an amount more than the group
         current has or above your maximum loan amount</Text>
      <Text>Please describe the reason you are requestng a group loan</Text>
      <TextInput />
      <Text>Remember, the group will vote anonymously whether to approve
         this emergency loan from your group savings</Text>
      <Button title='Submit'/>
      </View>
    );
  }
}