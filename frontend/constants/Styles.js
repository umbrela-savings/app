import Colors from './Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const Constants = {
  images: {
    background: require('../assets/images/umbrela_landing_background.png')
  }
};

export const LandingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginContainer: {
    width: '80%',
    backgroundColor: '#0086a2',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  textContainer: {
    alignItems: 'center'
  },
  loginText: {
    color: 'white'
  },
  inputContainer: {
    width: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#696969'
  },
  image: {
    alignItems: 'center'
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth
  }
});

export const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginContainer: {
    width: '80%',
    backgroundColor: '#0086a2',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  textContainer: {
    alignItems: 'center'
  },
  loginText: {
    color: 'white'
  },
  inputContainer: {
    width: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#696969'
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
    right: 25,
    top: 50,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#0086a2',
    width: '10%'
  }
});