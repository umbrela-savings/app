import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { recordPayment, loadUserAccount } from '../actions/account'

export class RecordPaymentScreen extends React.Component {
  state = {
    circle: null,
    user: null,
    circleAccount: null,
    amount: null
  }

  static propTypes = {
    recordPayment: PropTypes.func.isRequired,
    loadUserAccount: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    userAccount: PropTypes.array
  }

  componentWillMount() {
    const circle = this.props.navigation.getParam('circle');
    const user = this.props.navigation.getParam('user');
    const account = this.props.navigation.getParam('account');
    this.setState({ 
      circle: circle,
      user: user,
      circleAccount: account
    });
    this.props.loadUserAccount(user.id, circle.id);
  }

  onSubmit() {
    this.props.recordPayment(this.state.circleAccount.url, 
      this.props.userAccount[0].url, this.state.amount);
  }

  render() {
    return (
      <View>
        <Text>Who, how much, how, etc</Text>
        <TextInput 
        value={this.state.amount}
        placeholder='Amount'
        onChangeText={(text) => this.setState({ amount: text })}/>
        <Text>
          You will have a chane to review the members, rules, 
          and obligations of the circle before you officially join!
        </Text>
        <Button 
          title='View this Circle' 
          onPress={() => this.onSubmit()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading,
  userAccount: state.account.userAccount
});

export default connect(mapStateToProps, { recordPayment, loadUserAccount }) (RecordPaymentScreen);