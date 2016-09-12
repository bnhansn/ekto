import { push } from 'react-router-redux';
import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from './constants';
import {
  AUTHENTICATION_ERROR,
  AUTHENTICATION_START,
  AUTHENTICATION_SUCCESS,
} from '../App/constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    dispatch({ type: AUTHENTICATION_START });
    api.post('/login', data)
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        dispatch({ type: LOGIN_SUCCESS });
        dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
        dispatch(push('/accounts'));
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR });
        dispatch({ type: AUTHENTICATION_ERROR });
        const message = api.parseError(error, 'Error logging in');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}
