import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { LOGIN_SUCCESS } from '../Login/constants';
import { isSuccess, parseError } from '../../utils';

export function signup(data) {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    api.post('/users', data)
      .then(response => {
        if (isSuccess(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: SIGNUP_SUCCESS });
          dispatch({ type: LOGIN_SUCCESS, payload: response });
          dispatch(push('/accounts'));
        } else {
          const message = parseError(response, 'Error signing up');
          dispatch({ type: SIGNUP_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { type: 'danger', message },
          });
        }
      });
  };
}
