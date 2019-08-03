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
  JOIN_FAILED
} from "../constants/Types";

const url = 'http://47.90.103.121:8000';

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
(name, voting_rules, saving_rules, start_date, is_active) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  const body = JSON.stringify({ name, voting_rules, saving_rules, start_date, is_active });

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
  console.log(body);

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