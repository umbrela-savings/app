import React from 'react';
import { 
  TextInput,
  StyleSheet, 
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  ImageBackground,
  Button,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../assets/images/umbrela_landing_logo.svg';
import { login } from '../actions/auth';

const background = '../assets/images/umbrela_landing_background.png';
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export class LandingScreen extends React.Component {
  state = {
    username: '',
    password: ''
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
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

    } else {
      Alert.alert('A field is empty!');
    }
    
  };

  render() {
    return (
      <ImageBackground 
        source={require(background)} 
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
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(LandingScreen);

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
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth
  }
});