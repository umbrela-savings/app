import axios from 'axios';

import { tokenConfig } from './auth';
import {
  CIRCLELIST_LOADED,
  CIRCLE_LOADING,
  CIRCLELIST_FAILED,
  NEWCIRCLE_SUCCESS,
  NEWCIRCLE_FAIL,
  CIRCLE_FAILED,
  CIRCLE_LOADED
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
(name, votingRules, savingRules, startDate, isActive) => (dispatch, getState) => {
  dispatch({ type: CIRCLE_LOADING });

  const body = JSON.stringify({ name, votingRules, savingRules, startDate, isActive });

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