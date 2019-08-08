import React from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';

import { HomeStyles } from '../constants/Styles';
import { loadCircleFromCode, findUserInCircle } from '../actions/circle';

const styles = HomeStyles;

export class JoinCircleScreen extends React.Component {
  state = {
    code: null
  };

  static propTypes = {
    loadCircleFromCode: PropTypes.func.isRequired,
    findUserInCircle: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    codeSuccess: PropTypes.bool,
    circleuserExist: PropTypes.bool,
    circle: PropTypes.object
  };

  componentDidUpdate() {
    const user = this.props.navigation.getParam('user');

    if (this.props.codeSuccess) {
      if (this.props.circleuserExist == null)
        this.props.findUserInCircle(user.id, this.props.circle.id);
      else if (this.props.circleuserExist) {
        const resetAction = StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'MyCircles' }),
            NavigationActions.navigate({ 
              routeName: 'Circle',
              params: {
                circle: this.props.circle
              }
            })
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.navigation.navigate('CircleModal', 
        { 
          circle: this.props.circle, 
          user: user
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.body}
            value={this.state.code}
            placeholder='Circle Code'
            onChangeText={(text) => this.setState({ code: text })}
            />
        </View>
        <Button 
          title='Find'
          onPress={() => this.props.loadCircleFromCode(this.state.code)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.circle.isLoading,
  circle: state.circle.circle,
  codeSuccess: state.circle.codeSuccess,
  circleuserExist: state.circle.circleuserExist
});

export default connect(mapStateToProps, 
  { loadCircleFromCode, findUserInCircle }) (JoinCircleScreen);