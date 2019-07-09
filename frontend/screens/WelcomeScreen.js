import React from 'react';

import {
  StyleSheet, 
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome!',
  };

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LogIn')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log-In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign-Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#2A4073'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});