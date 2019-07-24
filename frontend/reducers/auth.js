import { 
  AsyncStorage, 
  Alert } from 'react-native';
import {
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
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOAD_ERROR: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
        isLoading: false,
        isAuthenticated: false
      };
    case LOGOUT_FAIL:
      if (action.payload.detail) Alert.alert(action.payload.detail);
      return {
        ...state
      }
    case REGISTER_FAIL:
      if (action.payload.username) Alert.alert(action.payload.username.join());
      if (action.payload.email) Alert.alert(action.payload.email.join());
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}