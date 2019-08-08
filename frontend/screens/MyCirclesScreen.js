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
import { StackActions } from 'react-navigation';

import { logout } from '../actions/auth';
import { loadCircleList, loadCircle } from '../actions/circle';
import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export class MyCirclesScreen extends React.Component {
  state = {
    listOfCircles: [],
    index: 0,
    reload: null
  }
  static propTypes = {
    logout: PropTypes.func.isRequired,
    loadCircleList: PropTypes.func.isRequired,
    loadCircle: PropTypes.func.isRequired,
    user: PropTypes.object,
    circle: PropTypes.object,
    circleList: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Circles',
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
    let circleList = this.props.circleList;
    let circle = this.props.circle;
    let list = this.state.listOfCircles;
    let index = this.state.index

    if (circle && 
      list.length < circleList.length &&
      circle != prevProps.circle) {
        this.state.listOfCircles.push(circle);
    }

    if (circleList.length > 0 && index < circleList.length) {
      this.props.loadCircle(circleList[index].circle);
      this.state.index++;
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
          {this.state.listOfCircles &&
            this.state.listOfCircles.map((circle, index) => 
            <TouchableOpacity
                key = {index}
                style = {styles.loginContainer}
                onPress = {() => this.props.navigation.navigate('Circle',
                 {circle: circle})}>
                <Text style = {styles.loginText}>
                  {circle.id}
                </Text>
            </TouchableOpacity>
            )
          }

          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('NewCircle', {
              user: this.props.user
            })}
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
  user: state.auth.user,
  circle: state.circle.circle
});

export default connect(mapStateToProps, 
  { loadCircleList, logout, loadCircle })(MyCirclesScreen);