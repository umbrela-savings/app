import React from 'react';
import {
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { login } from '../actions/auth';
import Logo from '../assets/images/umbrela_landing_logo.svg';
import { 
  HomeStyles,
  Constants } from '../constants/Styles';
import KeyboardShift from '../components/Keyboard';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export class LandingScreen extends React.Component {
  state = {
    username: '',
    password: ''
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('MyCircles');
    }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  _logIn() {
    const { username, password } = this.state;

    if (username && password) {
      this.props.login(username, password);

    } else {
      Alert.alert('A field is empty!');
    }

  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled
          enableOnAndroid
          enableAutomaticScroll>

          <ImageBackground
            source={Constants.images.background}
            style={{width: '100%', height: '100%'}}>

            <View style={styles.container}>

              <LoadingScreen loading={this.props.isLoading} />

              <View style={styles.image}>
                <Logo width={300} height={200}/>
              </View>

              <View
              style={styles.inputContainer}>
                <TextInput
                  style={styles.body}
                  value={this.state.username}
                  placeholder='Username'
                  autoCapitalize='none'
                  enablesReturnKeyAutomatically={true}
                  textContentType='username'
                  clearButtonMode='while-editing'
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </View>

              <View
                style={styles.inputContainer}>
                <TextInput
                  style={styles.body}
                  value={this.state.password}
                  placeholder='Password'
                  autoCapitalize='none'
                  enablesReturnKeyAutomatically={true}
                  textContentType='password'
                  clearButtonMode='while-editing'
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>

              <Button
              //onPress={() => this.onPressLogin()}
                title='Forgot Password?'
                color='white'
              />

              <TouchableOpacity
                onPress={() => this._logIn()}
                style={styles.loginContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.loginText}>Log in</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Register')}}
                style={styles.loginContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.loginText}>Create Account</Text>
                  </View>
              </TouchableOpacity>

            </View>

          </ImageBackground>

        </KeyboardAwareScrollView>
      );
    }
    return(
      <KeyboardShift>
        {() => (
        <ImageBackground
          source={Constants.images.background}
          style={{width: '100%', height: '100%'}}>

          <View style={styles.container}>

            <LoadingScreen loading={this.props.isLoading} />

            <View style={styles.image}>
              <Logo width={300} height={200}/>
            </View>

            <View
            style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.username}
                placeholder='User Name'
                onChangeText={(text) => this.setState({ username: text })}
              />
            </View>

            <View
              style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>

            <Button
            //onPress={() => this.onPressLogin()}
              title='Forgot Password?'
              color='grey'
            />

            <TouchableOpacity
              onPress={() => this._logIn()}
              style={styles.loginContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Log in</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('Register')}}
              style={styles.loginContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Create Account</Text>
                </View>
            </TouchableOpacity>

          </View>

        </ImageBackground>
        )}
      </KeyboardShift>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});
export default connect(mapStateToProps, { login })(LandingScreen);
