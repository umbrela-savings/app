import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout, loadUser } from '../actions/auth';
import { loadCircle } from '../actions/circle';
import { HomeStyles } from '../constants/Styles';
import LoadingScreen from './LoadingScreen';

const styles = HomeStyles;

export class HomeScreen extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadCircle: PropTypes.func.isRequired,
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
      )
    }
    };
    

  componentDidMount = async () => {
    await this.props.loadUser();
        
    if (this.props.user != null) {
      this.props.loadCircle(this.props.user.id);
    }
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.navigation.navigate('Landing');
    }
    this.props.loadCircle(this.props.user.id);
  }

  signOut() {
    this.props.logout();
  };

  render() {
    return (
      <View style={styles.container}>

        <LoadingScreen loading={this.props.isLoading} />

        <View>
          {this.props.circleList &&
            this.props.circleList.map((item, index) => 
            <TouchableOpacity
                key = {item.circle}
                style = {styles.loginContainer}
                onPress = {() => this.alertItemName(item)}>
                <Text style = {styles.loginText}>
                  {item.user}
                </Text>
            </TouchableOpacity>
            )
          }
        </View>

        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('NewCircle')}
            style={styles.loginContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.loginText}>Start A New Circle</Text>
              </View>
        </TouchableOpacity>
        
        
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
  { loadUser, loadCircle, logout })(HomeScreen);