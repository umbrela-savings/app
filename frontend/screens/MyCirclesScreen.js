import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  RefreshControl,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/auth';
import { loadCircleList } from '../actions/circle';
import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export class MyCirclesScreen extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    loadCircleList: PropTypes.func.isRequired,
    user: PropTypes.object,
    circleList: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Home')}
          title='Home' />
      ),
      headerRight: (
        <Button
          onPress={() => alert('Notification!')}
          title='bell' />
      )
    }
  };

  componentDidMount() {
    this.props.loadCircleList(this.props.user.id);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Landing');
    }
  }

  signOut() {
    this.props.logout();
  };

  onRefresh = () => {
    this.props.loadCircleList(this.props.user.id);
  }

  render() {
    return (
      <View style={styles.container}>

        { /*<LoadingScreen loading={this.props.isLoading} />*/ }

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this.onRefresh}
          />}
        >
          {this.props.circleList &&
            this.props.circleList.map((item, index) => 
            <TouchableOpacity
                key = {item.circle}
                style = {styles.loginContainer}
                onPress = {() => {
                  this.props.navigation.navigate('Circle', {
                    circleURL: item.circle
                  });
                }}>
                <Text style = {styles.loginText}>
                  {item.circle}
                </Text>
            </TouchableOpacity>
            )
          }
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('NewCircle')}
            style={styles.loginContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.loginText}>Start A New Circle</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Join', {
              user: this.props.user
            })}
            style={styles.loginContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.loginText}>Join A New Circle</Text>
              </View>
          </TouchableOpacity>
        </ScrollView>
        
        
        <TouchableOpacity 
          onPress={() => this.signOut()}
          style={styles.loginContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.loginText}>Sign Out</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  circleList: state.circle.circleList,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading || state.circle.isLoading,
  user: state.auth.user
});

export default connect(mapStateToProps, 
  { loadCircleList, logout })(MyCirclesScreen);