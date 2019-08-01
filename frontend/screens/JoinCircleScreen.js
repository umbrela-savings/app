import React from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';
import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export default class JoinCircleScreen extends React.Component {
  state = {
    code: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.body}
            value={this.state.code}
            placeholder='Circle Code'
            onChangeText={(text) => this.setState({ code: text })}
            />
        </View>
        <Button title='Find'/>
      </View>
    );
  }
}