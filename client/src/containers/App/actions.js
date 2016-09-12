import { push } from 'react-router-redux';
import api from '../../api';
import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOCATION_CHANGE,
  AUTHENTICATION_START,
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS,
} from './constants';
import { SHOW_ALERT } from '../Alert/constants';

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push('/'));
  };
}

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    api.post('/login', data)
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        dispatch(push('/accounts'));
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR });
        const message = api.parseError(error, 'Error logging in');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}

export function authenticate(token) {
  return dispatch => {
    dispatch({ type: AUTHENTICATION_START });
    api.post('/authenticate', { token })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
      })
      .catch(() => {
        dispatch({ type: AUTHENTICATION_ERROR });
        dispatch(logout());
      });
  };
}

export function locationChange(location) {
  return { type: LOCATION_CHANGE, location: { ...location } };
}
