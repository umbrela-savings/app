import axios from 'axios';

import { tokenConfig } from './auth';
import {
  CIRCLEACCOUNT_LOADED,
  CIRCLEACCOUNT_FAILED,
  USERACCOUNT_LOADED,
  USERACCOUNT_FAILED,
  ACCOUNT_LOADING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED
} from "../constants/Types";

import url from '../constants/URL';

export const loadCircleAccount = (id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });
  axios
    .get(url+'/circle_accounts/'+id, tokenConfig(getState))
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

export const loadUserAccount = (user_id, circle_id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });
  axios
    .get(url+'/accounts/?circle_id='+circle_id+'&user_id='+user_id, tokenConfig(getState))
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

export const recordPayment = (circle, user, amount) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });

  const body = JSON.stringify(
    { circle_account: circle,
      account: user,
      type: 'DP',
      amount: amount
    }
    );

  axios
    .post(url+'/transactions/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PAYMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PAYMENT_FAILED,
        payload: err.response.data
      });
    });
};