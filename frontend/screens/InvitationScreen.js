import React from 'react';
import {
  View,
  Button,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export default class InvitationScreen extends React.Component {

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Check out http://umbrelasavings.org/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        alert('Did not share successfully T T')
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}
