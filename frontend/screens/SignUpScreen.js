import React from 'react';
import { 
  TextInput, 
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../actions/auth';

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
      <View style={styles.container}>

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
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register }) (SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2bcbff"
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
    marginTop: 180,
    width: 300,
    height: 137
  }
});