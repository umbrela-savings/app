import { Alert } from 'react-native';
import {
  CIRCLEACCOUNT_LOADED,
  CIRCLEACCOUNT_FAILED,
  USERACCOUNT_LOADED,
  USERACCOUNT_FAILED
} from "../constants/Types";

const initialState = {
  circleAccounts: [],
  userAccount: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CIRCLEACCOUNT_LOADED: 
      return {
        ...state, 
        circleAccounts: action.payload
      };
    case CIRCLEACCOUNT_FAILED:
      Alert.alert('Loading Error: ', 'Cannot load the accounts');
      return {
        ...state,
      };
    case USERACCOUNT_LOADED:
      return {
        ...state,
        userAccount: action.payload
      }
    case USERACCOUNT_FAILED:
      return {
        ...state,
      }
    default:
        return state;
  }
}