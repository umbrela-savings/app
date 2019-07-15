import React from 'react';
import { 
  TextInput, 
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../actions/auth';
import Logo from '../assets/images/umbrela_landing_logo.svg';
import { 
  LandingStyles,
  Constants } from '../constants/Styles';

const styles = LandingStyles;

export class SignUpScreen extends React.Component {
  state = {
    first: '',
    last: '',
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

  static navigationOptions = {
    title: 'Sign Up',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  _addUser() {
    const { username, email, password, password2 } = this.state;
    if (username && email && password && password2) {
      if (password !== password2) {
        Alert.alert('Passwords do not match');
      } else {
        const newUser = {
          username,
          email,
          password
        };
        this.props.register(newUser);
        this.setState({
          first: '',
          last: '',
          username: '',
          email: '',
          password: '',
          password2: ''
        });
      }
    } else {
      Alert.alert('A field is empty!');
    }
  }

  render() {
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
              value={this.state.first}
              placeholder='First Name'
              onChangeText={(text) => this.setState({ first: text })}
              />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.body}
              value={this.state.last}
              placeholder='Last Name'
              onChangeText={(text) => this.setState({ last: text })}
              />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.body}
              value={this.state.username}
              placeholder='Username'
              onChangeText={(text) => this.setState({ username: text })}
              />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.body}
              value={this.state.email}
              placeholder='Email'
              onChangeText={(text) => this.setState({ email: text })}
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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.body}
              value={this.state.password2}
              placeholder='Confirm your password'
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
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register }) (SignUpScreen);