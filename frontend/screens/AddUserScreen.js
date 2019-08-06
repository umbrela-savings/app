import React from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HomeStyles } from '../constants/Styles';
import { sendMessage } from '../actions/circle.js';

const styles = HomeStyles;

export class AddUserScreen extends React.Component {
  state = {
    textInput: [],
    names: [],
    message: ''
  };

  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    messageSuccess: PropTypes.bool
  }

  componentDidUpdate() {
    if (this.props.messageSuccess) {
      const circle = this.props.navigation.getParam('circle', 'none');
      this.props.navigation.navigate('Invitation', {
        circleURL: circle.url, 
        message: this.state.message
      });
    }
  }

  addNames = (key) => {
    let textInput = this.state.textInput;
    let index = this.state.index;
    textInput.push(
      <View key={key}
        style={styles.inputContainer}>
        <TextInput
          style={styles.body}
          placeholder='First Name'
          onChangeText={(name) => {
            name ?
            this.state.names[2*key+2] = name :
            this.state.names[2*key+2] = ' ';
          }}
          />
          <TextInput
          style={styles.body}
          placeholder='Last Name'
          onChangeText={(name) => {
            name ? 
            this.state.names[2*key+3] = name :
            this.state.names[2*key+3] = ' ';
          }}
          />
      </View>);
    this.setState({ 
      textInput: textInput,
      index: index
    })
  }

  sendMessage() {
    const names = this.state.names;
    const user = this.props.navigation.getParam('user', 'none');
    const circle = this.props.navigation.getParam('circle', 'none');
    let str = '';
    if (names.length > 0) {
      for (let index = 0; index < names.length; index += 2) {
        if (names[index] == undefined || names[index + 1] == undefined) {
          Alert.alert('Empty field identified:', 'Please fill out the entire name');
          return;
        }
        str += names[index] + ' ' + names[index + 1];
        if (index == names.length - 2)
          str += '. ';
        else str += ', ';
      }
      str = 'Following users have been invited: ' + str +
            'Join via the code: ' + circle.join_code
      this.setState({ 
        message: str
      })
      this.props.sendMessage(str, circle, user.url)
    } else {
      str = 'This user have not invited any people. ' +
            'Join via the code: ' + circle.join_code
      this.setState({ 
        message: str
      })
      this.props.sendMessage(str, circle, user.url)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View key={-1}
          style={styles.inputContainer}>
        <TextInput
          style={styles.body}
          placeholder='First Name'
          onChangeText={(name) => {
            name ?
            this.state.names[0] = name :
            this.state.names[0] = ' ';
          }}
          />
          <TextInput
          style={styles.body}
          placeholder='Last Name'
          onChangeText={(name) => {
            name ?
            this.state.names[1] = name :
            this.state.names[1] = ' ';
          }}
          />
        </View>
          {this.state.textInput.map((value, index) => {
            return value;
          })}
        </ScrollView>
        <Button 
          title='Add New User'
          onPress={() => this.addNames(this.state.textInput.length)}
        />
        <Button 
          title='Continue'
          onPress={() => this.sendMessage()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  messageSuccess: state.circle.messageSuccess
});

export default connect(mapStateToProps, { sendMessage }) (AddUserScreen);