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
import { loadCircle, joinCircle} from '../actions/circle'

const styles = HomeStyles;

export class CircleModalScreen extends React.Component {

  static propTypes = {
    loadCircle: PropTypes.func.isRequired,
    joinCircle: PropTypes.func.isRequired,
    circle: PropTypes.object,
    isLoading: PropTypes.bool,
    joinSuccess: PropTypes.bool
  };

  componentWillMount() {
    const url = this.props.navigation.getParam('circleURL', 'none');
    this.props.loadCircle(url);
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
              circleURL: this.props.circle.url
            }
          })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  onJoin() {
    const user = this.props.navigation.getParam('user', 'none');
    this.props.joinCircle(user.url, this.props.circle.url);
  }
    
  render() {
    return (
      <View style={styles.container}>
        {this.props.circle &&
        <Text>{this.props.circle.name}</Text>}
        <Button 
          title='join'
          onPress={() => this.onJoin()}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  circle: state.circle.circle,
  isLoading: state.circle.isLoading,
  joinSuccess: state.circle.joinSuccess
});

export default connect(mapStateToProps, 
  { loadCircle, joinCircle })(CircleModalScreen);