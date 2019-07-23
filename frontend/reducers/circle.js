import { Alert } from 'react-native'
import {
  CIRCLELIST_LOADED,
  CIRCLELIST_FAILED,
  CIRCLE_LOADING,
  NEWCIRCLE_SUCCESS,
  NEWCIRCLE_FAIL
} from "../constants/Types";

const initialState = {
  circleList: [],
  isLoading: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CIRCLE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case CIRCLELIST_LOADED: 
      return {
        ...state,
        circleList: action.payload,
        isLoading: false
      };
    case CIRCLELIST_FAILED: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false
      };
    case NEWCIRCLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case NEWCIRCLE_FAIL:
      console.log(action.payload.name);
      Alert.alert(action.payload.name);
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}