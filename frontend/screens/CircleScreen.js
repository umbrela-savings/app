import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';
import { loadCircle } from '../actions/circle'

const styles = HomeStyles;

export class CircleScreen extends React.Component {

  static propTypes = {
    loadCircle: PropTypes.func.isRequired,
    circle: PropTypes.object,
    isLoading: PropTypes.bool
  };

  componentWillMount() {
    const url = this.props.navigation.getParam('circleURL', 'none');
    this.props.loadCircle(url);
  }
    
  render() {
    return (
      <View style={styles.container}>
        {this.props.circle &&
        <Text>{this.props.circle.name}</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  circle: state.circle.circle,
  isLoading: state.circle.isLoading
});

export default connect(mapStateToProps, 
  { loadCircle })(CircleScreen);