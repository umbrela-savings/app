import { combineReducers } from "redux";
import auth from "./auth";
import circle from './circle';
import account from './account';

export default combineReducers({
  auth,
  circle, 
  account
});