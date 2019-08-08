import { Alert } from 'react-native'
import {
  CIRCLELIST_LOADED,
  CIRCLELIST_FAILED,
  CIRCLE_LOADING,
  NEWCIRCLE_SUCCESS,
  NEWCIRCLE_FAIL,
  CIRCLE_FAILED,
  CIRCLE_LOADED,
  CODE_SUCCESS,
  CODE_FAILED,
  CIRCLEUSER_EXIST,
  CIRCLEUSER_NONEXIST,
  JOIN_FAILED,
  JOIN_SUCCESS,
  MESSAGE_FAILED,
  MESSAGE_SUCCESS,
  MESSAGE_LOADED,
  MESSAGE_NONEXIST
} from "../constants/Types";

const initialState = {
  circleList: [],
  circle: null,
  isLoading: false,
  newCircleSuccess: null,
  codeSuccess: null,
  circleuserExist: null,
  joinSuccess: null,
  messageSuccess: null,
  message: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CIRCLE_LOADING:
      return {
        ...state,
        isLoading: true,
        newCircleSuccess: null,
        circleuserExist: null
      };
    case CIRCLELIST_LOADED: 
      return {
        ...state,
        isLoading: false,
        circleList: action.payload,
        newCircleSuccess: null,
        circleuserExist: null,
        joinSuccess: null
      };
    case CIRCLELIST_FAILED: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: null,
        circleuserExist: null,
        joinSuccess: null
      };
    case NEWCIRCLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        circle: action.payload,
        newCircleSuccess: true,
        messageSuccess: null,
      };
    case NEWCIRCLE_FAIL:
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: false,
        messageSuccess: null
      };
    case CIRCLE_LOADED: 
      return {
        ...state,
        isLoading: false,
        circle: action.payload,
        newCircleSuccess: null,
        circleuserExist: null,
        codeSuccess: null,
        joinSuccess: null
      };
    case CIRCLE_FAILED: 
      Alert.alert(action.payload.detail);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: null,
        circleuserExist: null,
        codeSuccess: null,
        joinSuccess: null
      };
    case CODE_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        circle: action.payload,
        newCircleSuccess: null,
        codeSuccess: true
      };
    case CODE_FAILED: 
      Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false,
        newCircleSuccess: null,
        codeSuccess: false
      };
    case CIRCLEUSER_EXIST: 
      return {
        ...state,
        isLoading: false,
        circleuserExist: true
      };
    case CIRCLEUSER_NONEXIST: 
      return {
        ...state,
        isLoading: false,
        circleuserExist: false
      };
    case JOIN_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        codeSuccess: null,
        circleuserExist: null,
        joinSuccess: true
      };
    case JOIN_FAILED: 
    Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false,
        codeSuccess: null,
        circleuserExist: null,
        joinSuccess: false
      };
    case MESSAGE_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      messageSuccess: true
    };
    case MESSAGE_FAILED: 
    Alert.alert(action.payload);
      return {
        ...state,
        isLoading: false,
        messageSuccess: false
      };
    case MESSAGE_LOADED:
      return {
        ...state,
        isLoading: false,
        message: action.payload
      }
    case MESSAGE_NONEXIST:
      return {
        ...state,
        isLoading: false,
        message: action.payload
      }
    default:
      return state;
  }
}