import React from 'react';

import { 
  TextInput,
  StyleSheet, 
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  AsyncStorage,
} from 'react-native';

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  static navigationOptions = {
    title: 'Log In',
  };

  _storeData = async (item) => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(item));
    } catch (error) {
      // Error saving data
    }
  };

  _auth() {
    const username = this.state.username;
    const password = this.state.password;

    var url = 'http://localhost:3000/users'

    if (username && password) {
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let users = responseJson;
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == username) {
            if (users[i].password == password) {
                this._storeData(users[i].id);
                this.props.navigation.navigate('App');
                return;
            } else {
              Alert.alert('Password is wrong!');
              return;
            }
          }
        }
        Alert.alert('No user found!');
        this.setState({
          name: null,
          username: null,
          password: null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      Alert.alert('A field is empty!');
    }
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          value={this.state.username}
          placeholder="User Name"
          onChangeText={(text) => this.setState({ username: text })}
          />
        <TextInput
          style={{height: 40}}
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          />
        <TouchableOpacity onPress={() => {this._auth()}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log-In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate('Welcome')}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
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