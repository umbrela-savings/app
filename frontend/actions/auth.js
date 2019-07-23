import axios from "axios";

import {
  USER_LOADED,
  LOAD_ERROR,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../constants/Types";

const url = 'http://47.90.103.121:8000';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: AUTH_LOADING });

  axios
    .get(url+'/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOAD_ERROR,
        payload: err.response.data
      });
    });
};


// LOGIN USER
export const login = (username, password) => dispatch => {
  dispatch({ type: AUTH_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(url+"/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
  dispatch({ type: AUTH_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post(url+"/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(url+"/api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAIL,
        payload: err.response.data
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};