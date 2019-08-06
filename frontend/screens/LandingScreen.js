import React from 'react';
import { 
  TextInput,
<<<<<<< HEAD
  StyleSheet, 
=======
>>>>>>> issue#18-new-circle
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  ImageBackground,
  Button,
<<<<<<< HEAD
  Dimensions,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
=======
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

>>>>>>> issue#18-new-circle

import { login } from '../actions/auth';
import Logo from '../assets/images/umbrela_landing_logo.svg';
import { 
  LandingStyles,
  Constants } from '../constants/Styles';
<<<<<<< HEAD
=======
import KeyboardShift from '../components/Keyboard';
import LoadingScreen from './LoadingScreen';
>>>>>>> issue#18-new-circle

const styles = LandingStyles;

export class LandingScreen extends React.Component {
  state = {
    username: '',
    password: ''
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
<<<<<<< HEAD
      this.props.navigation.navigate('App');
=======
      this.props.navigation.navigate('MyCircles');
>>>>>>> issue#18-new-circle
    }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
<<<<<<< HEAD
    isAuthenticated: PropTypes.bool
  };

  _logIn() {
    const { username, password} = this.state;

    if (username && password) {
      this.props.login(username, password);
      
      this.setState({
        username: null,
        password: null,
      });
=======
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  _logIn() {
    const { username, password } = this.state;

    if (username && password) {
      this.props.login(username, password);
>>>>>>> issue#18-new-circle

    } else {
      Alert.alert('A field is empty!');
    }
    
  };

  render() {
<<<<<<< HEAD
    return (
      <ImageBackground
        source={Constants.images.background} 
        style={{width: '100%', height: '100%'}}>

        <View style={styles.container}>

          <View style={styles.image}>
            <Logo width={300} height={200}/>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.body}
              value={this.state.username}
              placeholder='User Name'
              onChangeText={(text) => this.setState({ username: text })}
            />
          </View>
          
          <View style={styles.inputContainer}>
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
            onPress={() => {this.props.navigation.navigate('SignUp')}}
            style={styles.loginContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.loginText}>Create Account</Text>
              </View>
          </TouchableOpacity>

        </View>
        
      </ImageBackground>
=======
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
>>>>>>> issue#18-new-circle
    );
  }
}

const mapStateToProps = state => ({
<<<<<<< HEAD
  isAuthenticated: state.auth.isAuthenticated
=======
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
>>>>>>> issue#18-new-circle
});
export default connect(mapStateToProps, { login })(LandingScreen);