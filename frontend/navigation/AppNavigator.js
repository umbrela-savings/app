import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';


import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import NewCircleScreen from '../screens/NewCircleScreen'
import LandingScreen from '../screens/LandingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import InvitationScreen from '../screens/InvitationScreen';
import CircleScreen from '../screens/CircleScreen';
import MessengerScreen from '../screens/MessengerScreen'
import OverlayScreen from '../screens/OverlayScreen'
import RequestScreen from '../screens/RequestScreen'

const CircleStack = 
  createBottomTabNavigator({
    Overlay: OverlayScreen,
    Circle: CircleScreen,
    Messenger: MessengerScreen,
    Request: RequestScreen
  },
  {
    initialRouteName: 'Circle'
  }
);

const AppStack = 
createStackNavigator({ 
  Home: HomeScreen,
  NewCircle: NewCircleScreen,
  Invitation: InvitationScreen,
  Circle: CircleStack
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
  createAnimatedSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }),
  
);
