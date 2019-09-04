import React from 'react';
import {
  View,
  Text,
  Button,
  Alert
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
  loadTransactions, 
  loadUserAccount,
  approve,
  reject,
  cancel
} from '../actions/account';

export class LoanRequestsScreen extends React.Component {
  state = {
    circle: null,
    user: null,
    circleAccount: null,
    executor: false,
  }


  static propTypes = {
    loadTransactions: PropTypes.func.isRequired,
    loadUserAccount: PropTypes.func.isRequired,
    approve: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    transactions: PropTypes.array,
    userAccount: PropTypes.array,
    isLoading: PropTypes.bool
  }

  componentWillMount() {
    const circle = this.props.navigation.dangerouslyGetParent().getParam('circle', 
      this.props.navigation.getParam('circle'));
    const user = this.props.navigation.dangerouslyGetParent().getParam('user', 
      this.props.navigation.getParam('user'));
    const account = this.props.navigation.dangerouslyGetParent().getParam('account', 
      this.props.navigation.getParam('account'));
    if (circle.executor == user.url) {
      this.setState({ executor: true });
    }
    this.setState({ 
      circle: circle,
      user: user,
      circleAccount: account
    });
    this.props.loadTransactions(circle.id)
    this.props.loadUserAccount(user.id, circle.id);
  }

  render() {
    return(
      <View>
        {this.props.transactions && 
        this.props.transactions.map((transaction, index) =>
        <View key={index}>
          <Text>type: {transaction.type}</Text>
          <Text>amount: {transaction.amount}</Text>
          <Text>status: {transaction.status}</Text>
          {(this.state.executor && transaction.status == 'pending') && 
            <View>
            <Button title='approve'
            onPress={() => Alert.alert(
              'Confirmed?',
              'Are you sure you want to approve this transaction?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Confirm', 
                  onPress: () => this.props.approve(transaction.url)},
              ],
              {cancelable: false},
            )}/>
            <Button title='reject'
            onPress={() => Alert.alert(
              'Confirmed?',
              'Are you sure you want to reject this transaction?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Confirm', 
                  onPress: () => this.props.reject(transaction.url)},
              ],
              {cancelable: false},
            )}/>
            </View>
          }
          {this.props.userAccount && 
          (transaction.account == this.props.userAccount[0].url) && 
          transaction.status == 'pending' &&
            <Button title='cancel'
            onPress={() => Alert.alert(
              'Confirmed?',
              'Are you sure you want to cancel this transaction?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Confirm', 
                  onPress: () => this.props.cancel(transaction.url)},
              ],
              {cancelable: false},
            )}/>
          }
          </View>
          )
        }

        <Button title='New Loan Request' 
        onPress={() => this.props.navigation.navigate('NewLoan')}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading,
  userAccount: state.account.userAccount,
  transactions: state.account.transactions
});

export default connect(mapStateToProps, 
  { loadTransactions, 
    loadUserAccount,
    approve,
    reject,
    cancel }) (LoanRequestsScreen);