import { push } from 'react-router-redux';
import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';
import { AUTHENTICATION_SUCCESS } from '../App/constants';

export function signup(data) {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    api.post('/signup', data)
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
        dispatch(push('/accounts'));
      })
      .catch(error => {
        dispatch({ type: SIGNUP_ERROR });
        const message = api.parseError(error, 'Error signing up');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}
