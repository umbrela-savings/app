import React from 'react';

import { TextInput, 
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      username: null,
      password: null,
    };
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  _addUser() {
    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;

    if (name && username && password) {

      let collection = {}
      collection.name = name;
      collection.username = username;
      collection.password = password;

      var url = 'http://localhost:3000/users'

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(collection)
      }).then(res => res.json())
      .catch(error => console.error(error))
      .then(response => console.log(response));

      this.setState({
        name: null,
        username: null,
        password: null,
      });

      this.props.navigation.navigate('LogIn');

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
            value={this.state.name}
            placeholder="Name"
            onChangeText={(text) => this.setState({ name: text })}
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