import React from 'react';
import {
  Button
} from 'react-native';
import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';


import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MyCirclesScreen from '../screens/MyCirclesScreen';
import NewCircleScreen from '../screens/NewCircleScreen'
import LandingScreen from '../screens/LandingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InvitationScreen from '../screens/InvitationScreen';
import CircleScreen from '../screens/CircleScreen';
import MessengerScreen from '../screens/MessengerScreen'
import OverlayScreen from '../screens/OverlayScreen'
import RequestScreen from '../screens/RequestScreen'
import JoinCircleScreen from '../screens/JoinCircleScreen'
import CircleModalScreen from '../screens/CircleModalScreen'

const RequestStack = 
createStackNavigator(
  {
    Request: RequestScreen
  }
);

const CircleTab = 
createBottomTabNavigator(
  {
    Overlay: OverlayScreen,
    CircleMain: CircleScreen,
    Messenger: MessengerScreen,
    Request: RequestStack
  },
  {
    initialRouteName: 'CircleMain',
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: 'null',
      headerRight: (
        <Button
          onPress={() => alert('Notification!')}
          title='bell' />
      )
    })
  }
);

const JoinStack = 
createStackNavigator(
  {
    Code: JoinCircleScreen,
    CircleModal: CircleModalScreen
  },
  {
    headerMode: 'none'
  }
);

const AppStack = 
createStackNavigator(
  { 
    MyCircles: MyCirclesScreen,
    NewCircle: NewCircleScreen,
    Invitation: InvitationScreen,
    Join: JoinStack,
    Circle: CircleTab
  },
  {
    headerMode: 'float',
    headerLayoutPreset: 'center',
  }
);

const AuthStack =
  createStackNavigator({ 
    Landing: {
      screen: LandingScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    Register: {
      screen: RegisterScreen,
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
