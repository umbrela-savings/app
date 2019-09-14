import React from 'react';
import {
  Button,
  TouchableOpacity,
  View
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors'

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

import { HomeStyles } from '../constants/Styles';
const styles = HomeStyles;

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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'CircleMain') {
          iconName = `ios-home${focused ? '' : ''}`;
        } else if (routeName === 'Messenger') {
          iconName = `ios-text`;
        } else if (routeName === 'Request') {
          iconName = `ios-cash`;
        } else if (routeName === 'Drawer') {
          iconName = `ios-reorder`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeBackgroundColor: Colors.headerBackground,
      inactiveBackgroundColor: Colors.headerBackground,
      activeTintColor: Colors.primaryActive,
      inactiveTintColor: Colors.primaryBackground,
    },
  }
);

const CircleDrawer = createDrawerNavigator(
  {
    CircleHome: CircleTab
    // RecordPayment: RecordPaymentScreen,
    // ConfirmPayment: ConfirmPaymentScreen,
    // LoanRequest: RequestStack,
    // NewLoan: NewLoanScreen
  },
  {
    initialRouteName: 'CircleHome',
    navigationOptions: ({ navigation }) => ({
      headerBack: 'null',
      headerRight: (
        <TouchableOpacity
          onPress={() => alert('Notification!')}
          style={styles.notificationContainer}>
          <View>
            <Ionicons name={`ios-notifications`} size={25} color={'#fff'}/>
          </View>
        </TouchableOpacity>
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
    MyCircles: {
      screen: MyCirclesScreen,
      navigationOptions: {
        title: 'My Circles',
        headerStyle: {
          backgroundColor: Colors.headerBackground
        },
        headerTintColor: "#fff",
      },
    },
    NewCircle: {
      screen: NewCircleStack,
      navigationOptions: {
        title: 'Start a New Circle',
        headerStyle: {
          backgroundColor: Colors.headerBackground
          },
        headerTintColor: "#fff",
      },
    },
    Join: {
      screen: JoinStack,
      navigationOptions: {
        title: 'Join a New Circle',
        headerStyle: {
          backgroundColor: Colors.headerBackground
          },
        headerTintColor: "#fff",
      },
    },
    Circle: {
      screen: CircleDrawer,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Colors.headerBackground
          },
        headerTintColor: "#fff",
      },
    },
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
