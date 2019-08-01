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
        isLoading: false,
        circleList: action.payload
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
        circle: action.payload,
        newCircleSuccess: true
      };
    case NEWCIRCLE_FAIL:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: false
      };
    case CIRCLE_LOADED: 
      return {
        ...state,
        isLoading: false,
        circle: action.payload,
        newCircleSuccess: false
      };
    case CIRCLE_FAILED: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: false
      };
    default:
      return state;
  }
}