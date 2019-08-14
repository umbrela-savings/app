import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadMessage, loadUserList } from '../actions/circle';
import { loadUserAccount } from '../actions/account'


export class DashboardScreen extends React.Component {
  state = {
    circle: null,
    show: false,
    index: 0,
    accounts: []
  }

  static propTypes = {
    loadMessage: PropTypes.func.isRequired,
    loadUserAccount: PropTypes.func.isRequired,
    message: PropTypes.array,
    users: PropTypes.array,
    account: PropTypes.object,
    isLoading: PropTypes.bool,
  }

  componentWillMount() {
    const circle = this.props.navigation.getParam('circle');
    this.props.loadUserList(circle.id);
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
    let account = this.props.account;
    let users = this.props.users;
    let index = this.state.index;

    if (account && account != prevProps.account) {
      this.state.accounts.push(account);
    }

    if (this.state.circle && users && index < users.length) {
      this.props.loadUserAccount(users[index].url.substring(42).slice(0, -1));
      ++this.state.index;
    }
  }

  render() {
    return (
      <View>
      {(this.state.accounts.length > 0 && this.state.circle) &&
            this.state.circle.users.map((users, index) => 
            <TouchableOpacity
              key = {index}>
              <Text>
                {users.name} {this.state.accounts[index].deposits}
              </Text>
            </TouchableOpacity>
            )
          }
      { (this.props.message.length > 0 && this.state.show) && 
        <Text>{this.props.message[0].message}</Text>
      }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  message: state.circle.message,
  users: state.circle.userList,
  account: state.account.userAccount
});

export default connect(mapStateToProps, { loadMessage, loadUserList, loadUserAccount }) (DashboardScreen);