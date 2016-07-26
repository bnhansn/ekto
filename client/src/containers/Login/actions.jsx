import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    api.post('/login', data)
      .then(response => {
        if (isSuccess(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: LOGIN_SUCCESS, payload: response });
          dispatch(push('/accounts'));
        } else {
          const message = parseError(response, 'Error logging in');
          dispatch({ type: LOGIN_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
