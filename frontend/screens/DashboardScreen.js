import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadMessage } from '../actions/circle';
import { loadUserAccount } from '../actions/account'


export class DashboardScreen extends React.Component {
  state = {
    circle: null,
    show: false,
    index: 1,
    accounts: []
  }

  static propTypes = {
    loadMessage: PropTypes.func.isRequired,
    loadUserAccount: PropTypes.func.isRequired,
    message: PropTypes.array,
    account: PropTypes.array,
    isLoading: PropTypes.bool,
  }

  componentWillMount() {
    const circle = this.props.navigation.getParam('circle');
    this.props.loadUserAccount(circle.users[0].id, circle.id);
    this.setState({ 
      circle: circle
    })
    let startDate = new Date(circle.start_date);
    let today = new Date();
    if (today < startDate) {
      this.setState({show:true});
      this.props.loadMessage(circle.id);
    } else {
      this.setState({show:false});
    }
  }

  componentDidUpdate(prevProps) {
    let circle = this.state.circle;
    let index = this.state.index;
    let account = this.props.account;

    if (account && account != prevProps.account)
      this.state.accounts.push(account[0]);
    
    if (circle.users.length > 0 && index < circle.users.length) {
      this.props.loadUserAccount(circle.users[index].id, circle.id);
      ++this.state.index;
    }
  }

  onRefresh = () => {
    this.props.loadUserAccount(this.state.circle.users[this.state.index-1].id, this.state.circle.id);
  }

  render() {
    return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this.onRefresh}
          />}
        >
      {this.state.accounts &&
        this.state.accounts.map((account, index) => 
            <TouchableOpacity
              key = {index}>
              <Text>
                {this.state.circle.users[index].username}
                {account.deposits}
              </Text>
            </TouchableOpacity>
            )
          }
        
      { (this.props.message.length > 0 && this.state.show) && 
        <Text>{this.props.message[0].message}</Text>
      }
      </ScrollView>
      
    );
  }
}

const mapStateToProps = state => ({
  message: state.circle.message,
  account: state.account.userAccount,
  isLoading: state.account.isLoading
});

export default connect(mapStateToProps, { loadMessage, loadUserAccount }) (DashboardScreen);