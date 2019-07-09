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
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          value={this.state.name}
          placeholder="Name"
          onChangeText={(text) => this.setState({ name: text })}
          />
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
        <TouchableOpacity onPress={() => {this._addUser()}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
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