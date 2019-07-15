import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/auth';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SUCCESS!',
  };

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  _signOut() {
    this.props.logout();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Successfully logged in!</Text>
        <TouchableOpacity 
          onPress={() => this._signOut()}
          style={styles.loginContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.loginText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  loginContainer: {
    width: '80%',
    backgroundColor: '#0086a2',
    borderRadius: 5,
    padding: 10,
    marginTop: 30
  },
  textContainer: {
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#696969'
  },
  image: {
    marginTop: 100
  }
});