import React from 'react';
import { 
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { register } from '../actions/auth';
import Logo from '../assets/images/umbrela_landing_logo.svg';
import { 
  SignUpStyles,
  Constants } from '../constants/Styles';
import KeyboardShift from '../components/Keyboard';
import LoadingScreen from './LoadingScreen';

const styles = SignUpStyles;

export class RegisterScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  _addUser() {
    const { 
      firstName, 
      lastName, 
      username, 
      email, 
      password, 
      password2 } = this.state;
    if (username && email && password && password2 && firstName && lastName) {
      if (password !== password2) {
        Alert.alert('Passwords do not match');
      } else {
        const newUser = {
          username,
          email,
          password,
          firstName,
          lastName,
        };
        this.props.register(newUser);
      }
    } else {
      Alert.alert('A field is empty!');
    }
  }

  

  render() {
    if (Platform.OS === 'ios') {
      return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}>

        <ImageBackground
          source={Constants.images.background} 
          style={{width: '100%', height: '100%'}}>

          <View style={styles.container}>

          <LoadingScreen loading={this.props.isLoading} />

          <TouchableOpacity 
              onPress={() => this.props.navigation.goBack()}
              style={styles.backContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Back</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.image}>
              <Logo width={300} height={200}/>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.firstName}
                placeholder='First Name'
                enablesReturnKeyAutomatically={true}
                textContentType='givenName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ firstName: text })}
                />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.lastName}
                placeholder='Last Name'
                enablesReturnKeyAutomatically={true}
                textContentType='familyName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ lastName: text })}
                />
            </View>

            <View style={styles.inputContainer}>
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.email}
                placeholder='Email'
                autoCapitalize='none'
                  enablesReturnKeyAutomatically={true}
                  textContentType='emailAddress'
                  clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ email: text })}
                />
            </View>

            <View style={styles.inputContainer}>
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.password2}
                placeholder='Confirm your password'
                autoCapitalize='none'
                enablesReturnKeyAutomatically={true}
                textContentType='password'
                clearButtonMode='while-editing'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password2: text })}
              />
            </View>

            <TouchableOpacity 
              onPress={() => {this._addUser()}}
              style={styles.loginContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Submit</Text>
                </View>
            </TouchableOpacity>

          </View>

        </ImageBackground>

      </KeyboardAwareScrollView>
      );
    }
    return (
      <KeyboardShift>
        {() => (
          <ImageBackground
          source={Constants.images.background} 
          style={{width: '100%', height: '100%'}}>

          <View style={styles.container}>

          <LoadingScreen loading={this.props.isLoading} />

          <TouchableOpacity 
              onPress={() => this.props.navigation.goBack()}
              style={styles.backContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Back</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.image}>
              <Logo width={300} height={200}/>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.firstName}
                placeholder='First Name'
                enablesReturnKeyAutomatically={true}
                textContentType='givenName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ firstName: text })}
                />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.lastName}
                placeholder='Last Name'
                enablesReturnKeyAutomatically={true}
                textContentType='familyName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ lastName: text })}
                />
            </View>

            <View style={styles.inputContainer}>
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.email}
                placeholder='Email'
                autoCapitalize='none'
                  enablesReturnKeyAutomatically={true}
                  textContentType='emailAddress'
                  clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ email: text })}
                />
            </View>

            <View style={styles.inputContainer}>
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.password2}
                placeholder='Confirm your password'
                autoCapitalize='none'
                enablesReturnKeyAutomatically={true}
                textContentType='password'
                clearButtonMode='while-editing'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password2: text })}
              />
            </View>

            <TouchableOpacity 
              onPress={() => {this._addUser()}}
              style={styles.loginContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Submit</Text>
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

export default connect(mapStateToProps, { register }) (RegisterScreen);