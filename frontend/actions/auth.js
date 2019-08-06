import axios from "axios";

import {
<<<<<<< HEAD
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
=======
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
>>>>>>> issue#18-new-circle
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../constants/Types";

<<<<<<< HEAD
const url = 'http://localhost:8000/';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
=======
const url = 'http://47.90.103.121:8000';

// LOGIN USER
export const login = (username, password) => dispatch => {
  //dispatch({ type: AUTH_LOADING });
>>>>>>> issue#18-new-circle
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
<<<<<<< HEAD
    .post(url+"api/auth/login", body, config)
=======
    .post(url+"/api/auth/login", body, config)
>>>>>>> issue#18-new-circle
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
<<<<<<< HEAD
      //dispatch(returnErrors(err.response.data, err.response.status));
=======
>>>>>>> issue#18-new-circle
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      });
    });
};

// REGISTER USER
<<<<<<< HEAD
export const register = ({ username, password, email }) => dispatch => {
=======
export const register = 
({ username, email, password, firstName, lastName }) => dispatch => {
  //dispatch({ type: AUTH_LOADING });
>>>>>>> issue#18-new-circle
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
<<<<<<< HEAD
  const body = JSON.stringify({ username, email, password });

  axios
    .post(url+"api/auth/register", body, config)
=======
  const body = JSON.stringify({ 
    username, 
    email, 
    password, 
    first_name: firstName, 
    last_name: lastName });

  axios
    .post(url+"/api/auth/register", body, config)
>>>>>>> issue#18-new-circle
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
<<<<<<< HEAD
      //dispatch(returnErrors(err.response.data, err.response.status));
=======
>>>>>>> issue#18-new-circle
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
<<<<<<< HEAD
  axios
    .post(url+"api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({ type: 'CLEAR_LEADS' });
=======
  dispatch({ type: AUTH_LOADING });
  axios
    .post(url+"/api/auth/logout", null, tokenConfig(getState))
    .then(res => {
>>>>>>> issue#18-new-circle
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
<<<<<<< HEAD
      //dispatch(returnErrors(err.response.data, err.response.status));
=======
      dispatch({
        type: LOGOUT_FAIL,
        payload: err.response.data
      });
>>>>>>> issue#18-new-circle
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