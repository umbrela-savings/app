import { 
  AsyncStorage, 
  Alert } from 'react-native';
import {
<<<<<<< HEAD
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../constants/Types";

const initialState = {
  token: AsyncStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
=======
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOAD_ERROR
} from "../constants/Types";

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
  isLoading: false
>>>>>>> issue#18-new-circle
};

export default function(state = initialState, action) {
  switch (action.type) {
<<<<<<< HEAD
    case USER_LOADING:
=======
    case AUTH_LOADING:
>>>>>>> issue#18-new-circle
      return {
        ...state,
        isLoading: true
      };
<<<<<<< HEAD
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      Alert.alert(action.payload.non_field_errors.join());
      return {
        ...state
      };
    case LOGOUT_SUCCESS:
        AsyncStorage.clear();
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
=======
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      Alert.alert('Log In Failed:', action.payload.non_field_errors.join());
      return {
        ...state,
        isLoading: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: null,
        isAuthenticated: null
      };
    case LOGOUT_FAIL:
      if (action.payload.detail) Alert.alert(action.payload.detail);
      return {
        ...state
      }
>>>>>>> issue#18-new-circle
    case REGISTER_FAIL:
      if (action.payload.username) Alert.alert(action.payload.username.join());
      if (action.payload.email) Alert.alert(action.payload.email.join());
      return {
        ...state,
        token: null,
        user: null,
<<<<<<< HEAD
        isAuthenticated: false,
        isLoading: false
=======
        isLoading: false,
        isAuthenticated: false
>>>>>>> issue#18-new-circle
      };
    default:
      return state;
  }
}