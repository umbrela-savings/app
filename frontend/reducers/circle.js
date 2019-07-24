import { Alert } from 'react-native'
import {
  CIRCLELIST_LOADED,
  CIRCLELIST_FAILED,
  CIRCLE_LOADING,
  NEWCIRCLE_SUCCESS,
  NEWCIRCLE_FAIL,
  CIRCLE_FAILED,
  CIRCLE_LOADED
} from "../constants/Types";

const initialState = {
  circleList: [],
  circle: null,
  isLoading: false,
  newCircleSuccess: null
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
        isLoading: false,
        newCircleSuccess: true
      };
    case NEWCIRCLE_FAIL:
      Alert.alert(action.payload.name);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: false
      };
    case CIRCLE_LOADED: 
      return {
        ...state,
        circle: action.payload,
        isLoading: false
      };
    case CIRCLE_FAILED: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}