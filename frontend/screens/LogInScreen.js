import React from 'react';

import { 
  TextInput,
  StyleSheet, 
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  AsyncStorage,
  Image,
  Button
} from 'react-native';



export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

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
      <View style={styles.container}>

        <View>
          <Image source={require("../assets/images/header.png")} 
                 style={styles.image}
          />
        </View>
        
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.body}
            value={this.state.username}
            placeholder="User Name"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.body}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <Button 
        //onPress={() => this.onPressLogin()}
          title="Forgot Password?"
          color="white"
        />
        
        <TouchableOpacity 
          onPress={() => {this._auth()}}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2bcbff"
  },
  loginContainer: {
    width: "80%",
    backgroundColor: "#0086a2",
    borderRadius: 5,
    padding: 10,
    marginTop: 30
  },
  textContainer: {
    alignItems: "center"
  },
  loginText: {
    color: "white",
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 5,
    backgroundColor: "#ffffff"
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#696969"
  },
  image: {
    marginTop: 180,
    width: 300,
    height: 137
  }
});