import { Alert } from 'react-native';
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