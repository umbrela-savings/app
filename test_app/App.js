import React from 'react';

import { TextInput
       , StyleSheet
       , Alert
       , FlatList
       , Image
       , Text
       , TouchableOpacity
       , View
       , ActivityIndicator
       , AsyncStorage
       , StatusBar } from 'react-native';

import { createAppContainer
       , createStackNavigator
       , StackNavigator
       , StackActions
       , NavigationActions
       , createSwitchNavigator } from 'react-navigation';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

// first screen you see when you open the app.
class IntroScreen extends React.Component {
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

class SignUpScreen extends React.Component {
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
    const size = this.state.size;

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
          onPress={() => {this.props.navigation.navigate('Intro')}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class LogInScreen extends React.Component {
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
                AsyncStorage.setItem('userToken', users[i].id);
                this.props.navigation.navigate('App');
              return;
            } else {
              Alert.alert('Password is wrong!');
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
          onPress={() => {this.props.navigation.navigate('Intro')}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SUCCESS!',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Successfully logged in!</Text>
        <TouchableOpacity onPress={this._signOutAsync}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
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

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack =
  createStackNavigator({ Intro: IntroScreen,
                         LogIn: LogInScreen,
                         SignUp: SignUpScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class app extends React.Component {
  render() {
    return <AppContainer />;
  }
}
