import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack =
  createStackNavigator({ Welcome: WelcomeScreen,
                         LogIn: LogInScreen,
                         SignUp: SignUpScreen });

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
