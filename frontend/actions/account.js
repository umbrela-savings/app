import axios from 'axios';

import { tokenConfig } from './auth';
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

export const withdraw = (circle, user, amount) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });

  const body = JSON.stringify(
    { circle_account: circle,
      account: user,
      type: 'WD',
      amount: amount
    }
    );

  axios
    .post(url+'/transactions/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: WITHDRAW_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: WITHDRAW_FAILED,
        payload: err.response.data
      });
    });
};

export const loadTransactions = (id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });
  axios
    .get(url+'/transactions/?circle_id='+id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: TRANSACTIONS_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: TRANSACTIONS_FAILED,
        payload: err.response.data
      });
    });
};

export const cancel = (id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });

  const body = JSON.stringify(
    { transaction_id: id,
      status: 'withdrawn'
    }
  );

  axios
    .post(url+'/transaction_statuses/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CANCEL_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CANCEL_FAIL,
        payload: err.response.data
      });
    });
};

export const approve = (id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });

  const body = JSON.stringify(
    { transaction_id: id,
      status: 'approved'
    }
  );

  axios
    .post(url+'/transaction_statuses/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: APPROVE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: APPROVE_FAIL,
        payload: err.response.data
      });
    });
};

export const reject = (id) => (dispatch, getState) => {
  dispatch({ type: ACCOUNT_LOADING });

  const body = JSON.stringify(
    { transaction_id: id,
      status: 'rejected'
    }
  );

  axios
    .post(url+'/transaction_statuses/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: REJECT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REJECT_FAIL,
        payload: err.response.data
      });
    });
};