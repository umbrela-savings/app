import React from 'react';
import {
  View,
  Button,
  TextInput,
  Text
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withdraw, loadUserAccount } from '../actions/account'

export class NewLoanScreen extends React.Component {

  state = {
    circle: null,
    user: null,
    circleAccount: null,
    amount: null
  }

  static propTypes = {
    withdraw: PropTypes.func.isRequired,
    loadUserAccount: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    userAccount: PropTypes.array
  }

  componentWillMount() {
    const circle = this.props.navigation.dangerouslyGetParent().getParam('circle');
    const user = this.props.navigation.dangerouslyGetParent().getParam('user');
    const account = this.props.navigation.dangerouslyGetParent().getParam('account');
    this.setState({ 
      circle: circle,
      user: user,
      circleAccount: account
    });
    this.props.loadUserAccount(user.id, circle.id);
  }

  onSubmit() {
    this.props.withdraw(this.state.circleAccount.url, 
      this.props.userAccount[0].url, this.state.amount);
  }

  render() {
    return (
      <View>
      <Text>How much would you like to request from the group</Text>
      <TextInput 
        value={this.state.amount}
        placeholder='Amount'
        onChangeText={(text) => this.setState({ amount: text })}/>
      <Text>Note that you can't request an amount more than the group
         current has or above your maximum loan amount</Text>
      <Text>Please describe the reason you are requestng a group loan</Text>
      <TextInput placeholder='Reason'/>
      <Text>Remember, the group will vote anonymously whether to approve
         this emergency loan from your group savings</Text>
      <Button title='Submit'
        onPress={() => this.onSubmit()}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading,
  userAccount: state.account.userAccount
});

export default connect(mapStateToProps, { withdraw, loadUserAccount }) (NewLoanScreen);