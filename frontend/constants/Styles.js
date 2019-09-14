import Colors from './Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const Constants = {
  images: {
    background: require('../assets/images/umbrela_landing_background.png')
  }
};

export const HomeStyles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 20,
  },
  baseText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
    color: Colors.primaryText
  },
  fineText: {
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: Colors.fineText,
    textAlign: 'right'
  },
  noteText: {
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
    color: Colors.noteText
  },
  boldText: {
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: -10,
    color: Colors.primaryText
  },
  supportText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 0,
    marginVertical: 10,
    color: Colors.primaryText
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  loginContainer: {
    width: '80%',
    backgroundColor: Colors.accountButton,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  activeContainer: {
    backgroundColor: Colors.primaryActive,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  notificationContainer: {
    width: '80%',
    backgroundColor: Colors.headerBackground,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  textContainer: {
    alignItems: 'center'
  },
  loginText: {
    color: Colors.loginText
  },
  inputContainer: {
    width: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primaryBorderColor,
    borderRadius: 5,
    backgroundColor: Colors.primaryBackground
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: Colors.primaryBorderColor
  },
  image: {
    alignItems: 'center'
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth
  },
  backContainer: {
    position: 'absolute',
    right: '10%',
    top: '5%',
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.accountButton,
    width: '15%'
  },
  homeContainer: {
    position: 'absolute',
    left: 10,
    top: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.accountButton,
    width: '15%'
  }
});
