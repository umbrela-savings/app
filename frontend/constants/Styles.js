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
<<<<<<< HEAD
    marginTop: 30
=======
    marginHorizontal: 10,
    marginVertical: 5
>>>>>>> issue#18-new-circle
  },
  textContainer: {
    alignItems: 'center'
  },
  loginText: {
<<<<<<< HEAD
    color: 'white',
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
=======
    color: 'white'
  },
  inputContainer: {
    width: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
>>>>>>> issue#18-new-circle
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
<<<<<<< HEAD
=======
  },
  backContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#0086a2',
    width: '15%'
  }
});

export const HomeStyles = StyleSheet.create({
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
  homeContainer: {
    position: 'absolute',
    left: 10,
    top: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#0086a2',
    width: '15%'
>>>>>>> issue#18-new-circle
  }
});