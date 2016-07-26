import api from '../../api';
import { isSuccess } from '../../utils';
import { push } from 'react-router-redux';
import { LOCATION_CHANGE } from './constants';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../Login/constants';

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push('/'));
  };
}

export function authenticate(token) {
  return dispatch => {
    api.post('/authenticate', { token })
      .then(response => {
        if (isSuccess(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: LOGIN_SUCCESS, payload: response });
        } else {
          dispatch(logout());
        }
      });
  };
}

export function locationChange(location) {
  return { type: LOCATION_CHANGE, ...location };
}
