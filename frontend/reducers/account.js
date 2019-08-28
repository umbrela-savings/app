import { Alert } from 'react-native';
import {
  CIRCLEACCOUNT_LOADED,
  CIRCLEACCOUNT_FAILED,
  USERACCOUNT_LOADED,
  USERACCOUNT_FAILED,
  ACCOUNT_LOADING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
  WITHDRAW_FAILED,
  WITHDRAW_SUCCESS
} from "../constants/Types";

const initialState = {
  circleAccount: null,
  userAccount: null,
  isLoading: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_LOADING: 
      return {
        ...state,
        isLoading: true
      };
    case CIRCLEACCOUNT_LOADED: 
      return {
        ...state, 
        circleAccount: action.payload,
        isLoading: false
      };
    case CIRCLEACCOUNT_FAILED:
      Alert.alert('Loading Error: ', 'Cannot load the accounts');
      return {
        ...state,
        isLoading: false
      };
    case USERACCOUNT_LOADED:
      return {
        ...state,
        userAccount: action.payload,
        isLoading: false
      };
    case USERACCOUNT_FAILED:
      return {
        ...state,
        isLoading: false
      };
    case PAYMENT_SUCCESS:
      Alert.alert('Payment success!');
      return {
        ...state,
        isLoading: false
      };
    case PAYMENT_FAILED:
      Alert.alert('Payment failed!');
      return {
        ...state,
        isLoading: false
      };
    case WITHDRAW_SUCCESS:
      Alert.alert('Withdrawal submitted!');
      return {
        ...state,
        isLoading: false
      };
    case WITHDRAW_FAILED:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false
      };
    default:
        return state;
  }
}