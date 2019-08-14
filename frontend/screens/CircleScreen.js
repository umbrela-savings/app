import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';

import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';
import { loadCircle, joinCircle } from '../actions/circle'

const styles = HomeStyles;

export class CircleScreen extends React.Component {
  state = {
    circle: null,
    account: null
  }

  static propTypes = {
    loadCircle: PropTypes.func.isRequired,
    joinCircle: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    circleuserExist: PropTypes.bool,
    joinSuccess: PropTypes.bool
  };

  componentWillMount() {
    const circle = this.props.navigation.dangerouslyGetParent().getParam('circle', 
    this.props.navigation.getParam('circle'));
    const account = this.props.navigation.dangerouslyGetParent().getParam('account');
    this.setState({
      circle: circle,
      account: account
    })
  }

  componentDidUpdate() {
    if (this.props.joinSuccess) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'MyCircles' }),
          NavigationActions.navigate({ 
            routeName: 'Circle',
            params: {
              circle: this.state.circle
            }
          })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  onJoin() {
    const user = this.props.navigation.getParam('user', 'none');
    this.props.joinCircle(user.url, this.state.circle.url);
  }
    
  render() {
    return (
      <View style={styles.container}>
        {this.state.circle &&
        <Text>{this.state.circle.name}</Text>}
        {this.state.account &&
        <Text>deposits: {this.state.account.deposits}</Text>}
        { (this.props.circleuserExist === false ||
          this.props.joinSuccess === false) && 
          <Button 
          title='join'
          onPress={() => this.onJoin()}/>
        }
        
        <Button title='Go to dashboard'
          onPress={() => this.props.navigation.navigate('Dashboard', 
          {
            circle: this.state.circle
          })}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.circle.isLoading,
  circleuserExist: state.circle.circleuserExist,
  joinSuccess: state.circle.joinSuccess
});

export default connect(mapStateToProps, 
  { loadCircle, joinCircle })(CircleScreen);