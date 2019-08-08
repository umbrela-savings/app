import React from 'react';
import {
  Button
} from 'react-native';
import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
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
import LoanRequestsScreen from '../screens/LoanRequestsScreen'
import JoinCircleScreen from '../screens/JoinCircleScreen'
import LoanScreen from '../screens/LoanScreen'
import NewLoanScreen from '../screens/NewLoanScreen'
import AddUserScreen from '../screens/AddUserScreen'
import DashboardScreen from '../screens/DashboardScreen'
import RecordPaymentScreen from '../screens/RecordPaymentScreen'
import ConfirmPaymentScreen from '../screens/ConfirmPaymentScreen'

const RequestStack = 
createStackNavigator(
  {
    Request: LoanRequestsScreen,
    Loan: LoanScreen,
    NewLoan: NewLoanScreen
  },
  {
    headerMode: 'none'
  }
);

const CircleMainStack = createStackNavigator(
  {
    Main: CircleScreen,
    Dashboard: DashboardScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const CircleTab = createBottomTabNavigator(
  {
    Drawer: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress: () => {
          navigation.openDrawer();
        },
      })
    },
    CircleMain: CircleMainStack,
    Messenger: MessengerScreen,
    Request: RequestStack
  },
  {
    initialRouteName: 'CircleMain',
    /*navigationOptions: () => ({
      headerBackTitle: 'null',
      headerRight: (
        <Button
          onPress={() => alert('Notification!')}
          title='bell' />
      )
    })*/
  }
);

const CircleDrawer = createDrawerNavigator(
  {
    CircleHome: CircleTab,
    RecordPayment: RecordPaymentScreen,
    ConfirmPayment: ConfirmPaymentScreen
  },
  {
    initialRouteName: 'CircleHome',
    navigationOptions: ({ navigation }) => ({
      headerBack: 'null',
      headerRight: (
        <Button
          onPress={() => alert('Notification!')}
          title='bell' />
      )
    })
  }
)

const JoinStack = createStackNavigator(
  {
    Code: JoinCircleScreen,
    CircleModal: CircleScreen
  },
  {
    headerMode: 'none'
  }
);

const NewCircleStack = createStackNavigator(
  {
    Rules: NewCircleScreen,
    Add: AddUserScreen,
    Invitation: InvitationScreen
  },
  {
    headerMode: 'none'
  }
);

const AppStack = 
createStackNavigator(
  { 
    MyCircles: MyCirclesScreen,
    NewCircle: NewCircleStack,
    Join: JoinStack,
    Circle: CircleDrawer
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
