import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
  loadTransactions, 
  loadUserAccount,
  approve,
  reject,
  cancel
} from '../actions/circle';

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
    userAccount: PropTypes.object,
    isLoading: PropTypes.bool
  }

  componentWillMount() {
    const circle = this.props.navigation.dangerouslyGetParent().getParam('circle', 
      this.props.navigation.getParam('circle'));
    const user = this.props.navigation.dangerouslyGetParent().getParam('user', 
      this.props.navigation.getParam('user'));
    const account = this.props.navigation.dangerouslyGetParent().getParam('account', 
      this.props.navigation.getParam('account'));
    if (circie.executor == user.url) {
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
          <Text>amount: {transacton.amount}</Text>
          <Text>status: {transaction.status}</Text>
          {this.state.executor && 
            <View>
            <Button title='approve'
            onPress={() => this.props.approve(transaction.url)}/>
            <Button title='reject'
            onPress={() => this.props.reject(transaction.url)}/>
            </View>
          }
          {(transaction.account == this.props.userAccount.url) && 
            <Button title='cancel'
            onPress={() => this.props.cancel(transaction.url)}/>
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