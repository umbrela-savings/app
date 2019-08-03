import React from 'react';
import {
  View,
  Button,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';

import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export default class InvitationScreen extends React.Component {

  onSubmit() {
    const circle = this.props.navigation.getParam('circle', 'none');

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'MyCircles' }),
        NavigationActions.navigate({ 
          routeName: 'Circle',
          params: {
            circleURL: circle.url
          }
        })
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  onShare = async () => {
    try {
      const circle = this.props.navigation.getParam('circle', 'none');

      const result = await Share.share({
        message:
          circle.join_code,
      });

      if (result.action === Share.sharedAction) { 
        if (result.activityType) { 
          // shared with activity type of result.activityType
        } else { 
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        alert('Did not share successfully')
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.onShare} title="Share" />
        <Button onPress={() => this.onSubmit()} title="Go to your circle" />
      </View>
    );
  }
}
