import React from 'react';
import {
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform,
  ScrollView
} from 'react-native';

// FOR CALC
import Svg, { Circle } from 'react-native-svg';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// FOR PIE CHART
import PieChart from 'react-native-pie-chart';
import Colors from '../constants/Colors'

import { register } from '../actions/auth';
import Logo from '../assets/images/umbrela_landing_logo.svg';
import {
  HomeStyles,
  Constants } from '../constants/Styles';
import KeyboardShift from '../components/Keyboard';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

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
    const result = parseInt(this.state.firstName) + parseInt(this.state.lastName)
    // FOR PIE CHART
    const chart_wh = 200
    const series = [100, 50, 150]
    const sliceColor = [
      Colors.primaryActive,
      Colors.secondaryActive,
      Colors.primaryInert]

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

            <View style={styles.image}>
              <Logo width={300} height={200}/>
            </View>

            <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.backContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.loginText}>Back</Text>
                  </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.firstName}
                placeholder='First Name'
                enablesReturnKeyAutomatically={true}
                textContentType='givenName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ firstName: text })}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.lastNameInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.lastNameInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.usernameInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.usernameInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.emailInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.emailInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.passwordInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.passwordCheck.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.passwordCheck = input; }}
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
      <ScrollView>
          <ImageBackground
          source={Constants.images.background}
          style={{width: '100%', height: '100%'}}>

          <View style={styles.container}>

          <LoadingScreen loading={this.props.isLoading} />

            <View style={styles.image}>
              <Logo width={300} height={200}/>
            </View>

            <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.backContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.loginText}>Back</Text>
                  </View>
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.boldText}>${ result ? result : 0 }</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.supportText}>MAX LOAN</Text>
                <Svg height='27' width='27' viewBox='0 0 27 27'>
                  <Circle
                    cx='9'
                    cy='21'
                    r='4'
                    stroke={Colors.noteText}
                    strokeWidth='0'
                    fill={Colors.noteText}
                  />
                </Svg>
              </View>

            </View>

            <PieChart
            // FOR PIE CHART
              chart_wh={chart_wh}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={.85}
              coverFill={'#fff'}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.body}
                value={this.state.firstName}
                placeholder='First Name'
                enablesReturnKeyAutomatically={true}
                textContentType='givenName'
                clearButtonMode='while-editing'
                onChangeText={(text) => this.setState({ firstName: text })}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.lastNameInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.lastNameInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.usernameInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.usernameInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.emailInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.emailInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.passwordInput.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.passwordInput = input; }}
                returnKeyType = { 'next' }
                onSubmitEditing={() => { this.passwordCheck.focus(); }}
                blurOnSubmit={false}
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
                ref={(input) => { this.passwordCheck = input; }}
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
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { register }) (RegisterScreen);
