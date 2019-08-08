import React from 'react';
import {
  Text,
  FlatList,
  View
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadMessage } from '../actions/circle';


export class DashboardScreen extends React.Component {
  state = {
    circle: null,
    show: false
  }

  static propTypes = {
    loadMessage: PropTypes.func.isRequired,
    message: PropTypes.array
  }

  componentWillMount() {
    const circle = this.props.navigation.getParam('circle');
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

  render() {
    return (
      <View>
      <FlatList
        data={this.state.circle.users}
        renderItem={({item}) => <Text>{item.first_name}</Text>}
        keyExtractor={item => item.id.toString()}
      />
      { (this.props.message.length > 0 && this.state.show) && 
        <Text>{this.props.message[0].message}</Text>
      }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  message: state.circle.message
});

export default connect(mapStateToProps, { loadMessage }) (DashboardScreen);