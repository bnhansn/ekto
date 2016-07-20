import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOCATION_CHANGE,
} from './constants';
import axios from 'axios';
import { API_URL } from 'config'; // eslint-disable-line
import { push } from 'react-router-redux';

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push('/'));
  };
}

export function authenticate(token) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${API_URL}/authenticate`,
      data: { token },
    })
      .then(response => {
        dispatch({ type: LOGIN_SUCCESS, payload: response });
      })
      .catch(() => {
        logout();
      });
  };
}

export function locationChange(location) {
  return { type: LOCATION_CHANGE, ...location };
}
