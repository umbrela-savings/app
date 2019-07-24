import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import NewCircleScreen from '../screens/NewCircleScreen'
import LandingScreen from '../screens/LandingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import InvitationScreen from '../screens/InvitationScreen'

const AppStack = 
createStackNavigator({ 
  Home: HomeScreen,
  NewCircle: NewCircleScreen,
  Invitation: InvitationScreen
});

const AuthStack =
  createStackNavigator({ 
    Landing: {
      screen: LandingScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        header: null
      })
    }
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);
