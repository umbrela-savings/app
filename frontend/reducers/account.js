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
  WITHDRAW_SUCCESS,
  TRANSACTIONS_LOADED,
  TRANSACTIONS_FAILED,
  APPROVE_FAIL,
  APPROVE_SUCCESS,
  REJECT_FAIL,
  REJECT_SUCCESS,
  CANCEL_FAIL,
  CANCEL_SUCCESS
} from "../constants/Types";

const initialState = {
  circleAccount: null,
  userAccount: null,
  isLoading: null,
  transactions: null
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
    case TRANSACTIONS_LOADED:
      return {
        ...state,
        isLoading: false,
        transactions: action.payload
      };
    case TRANSACTIONS_FAILED:
        return {
          ...state,
          isLoading: false,
          transactions: action.payload
    };
    case APPROVE_SUCCESS:
      Alert.alert('Approved!');
      return {
        ...state,
        isLoading: false
      };
    case APPROVE_FAIL:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false
      };
    case REJECT_SUCCESS:
      Alert.alert('Rejected!');
      return {
        ...state,
        isLoading: false
      };
    case REJECT_FAIL:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false
      };
    case CANCEL_SUCCESS:
      Alert.alert('Cancel!');
      return {
        ...state,
        isLoading: false
      };
    case CANCEL_FAIL:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false
      };
    default:
        return state;
  }
}