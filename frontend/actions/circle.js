import axios from 'axios';

import { tokenConfig } from './auth';
import {
  CIRCLELIST_LOADED,
  CIRCLE_LOADING,
  CIRCLELIST_FAILED,
  NEWCIRCLE_SUCCESS,
  NEWCIRCLE_FAIL,
  CIRCLE_FAILED,
  CIRCLE_LOADED,
  CODE_SUCCESS,
  CODE_FAILED,
  CIRCLEUSER_EXIST,
  CIRCLEUSER_NONEXIST,
  JOIN_SUCCESS,
  JOIN_FAILED,
  MESSAGE_FAILED,
  MESSAGE_SUCCESS,
  MESSAGE_LOADED,
  MESSAGE_NONEXIST,
  USERLIST_LOADED,
  USERLIST_FAILED
} from '../constants/Types';

import url from '../constants/URL';

export const loadCircleList = (id) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(url+'/circleusers/?user_id='+id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CIRCLELIST_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CIRCLELIST_FAILED,
        payload: err.response.data
      });
    });
};

export const createCircle = 
( name, 
  executor,
  voting_rules, 
  lending_rules,
  contribution_amount,
  contrbution_frequency,
  contract_length,
  start_date) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  const body = JSON.stringify(
    { name, 
      executor,
      voting_rules, 
      lending_rules,
      contribution_amount,
      contrbution_frequency,
      contract_length,
      start_date
    });

  axios
    .post(url+'/circles/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: NEWCIRCLE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: NEWCIRCLE_FAIL,
        payload: err.response.data
      });
    });
};

export const loadCircle = (circleURL) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(circleURL, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CIRCLE_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CIRCLE_FAILED,
        payload: err.response.data
      });
    });
};

export const loadCircleFromCode = (code) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(url+'/circles/join_code/'+code, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CODE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CODE_FAILED,
        payload: err.response.data
      });
    });
};

export const findUserInCircle = (user_id, circle_id) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(url+'/circleusers/?user_id='+user_id+'&circle_id='+circle_id, 
    tokenConfig(getState))
    .then(res => {
      if (res.data.length < 1) {
        dispatch({
          type: CIRCLEUSER_NONEXIST,
          payload: res.data
        });
      } else {
        dispatch({
          type: CIRCLEUSER_EXIST,
          payload: res.data
        });
      }
    })
};

export const joinCircle = (user, circle) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  const body = JSON.stringify({ 
    circle, user
  })

  axios
    .post(url+'/circleusers/', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: JOIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: JOIN_FAILED,
        payload: err.response.data
      });
    });
};

export const sendMessage = (message, circle, user) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  let circle_id = circle.id;
  let circle_url = circle.url

  const body = JSON.stringify({ 
    message, circle: circle_url, user
  })

  axios
    .post(url+'/messages/'+'?'+'circle_id='+circle_id, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MESSAGE_FAILED,
        payload: err.response.data
      });
    });
};

export const loadMessage = (circle_id) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(url+'/messages/'+'?'+'circle_id='+circle_id, tokenConfig(getState))
    .then(res => {
      if (res.data.length < 1) {
        dispatch({
          type: MESSAGE_NONEXIST,
          payload: res.data
        });
      } else {
        dispatch({
          type: MESSAGE_LOADED,
          payload: res.data
        });
      }
    })
};

export const loadUserList = (id) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  axios
    .get(url+'/circleusers/?circle_id='+id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USERLIST_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USERLIST_FAILED,
        payload: err.response.data
      });
    });
};