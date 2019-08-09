import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native'

export default class LoanRequestsScreen extends React.Component {
  render() {
    return(
      <View>
        <Button title='New Loan Request' 
        onPress={() => this.props.navigation.navigate('NewLoan')}/>
      </View>
    );
  }
}