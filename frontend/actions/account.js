import axios from 'axios';

import { tokenConfig } from './auth';
import {
  CIRCLEACCOUNT_LOADED,
  CIRCLEACCOUNT_FAILED,
  USERACCOUNT_LOADED,
  USERACCOUNT_FAILED
} from "../constants/Types";

import url from '../constants/URL';

export const loadCircleAccount = () => (dispatch, getState) => {
  axios
    .get(url+'/circle_accounts/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CIRCLEACCOUNT_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CIRCLEACCOUNT_FAILED,
        payload: err.response.data
      });
    });
};

export const loadUserAccount = (id) => (dispatch, getState) => {
  axios
    .get(url+'/accounts/'+id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USERACCOUNT_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USERACCOUNT_FAILED,
        payload: err.response.data
      });
    });
};