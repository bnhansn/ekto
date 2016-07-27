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
import { push } from 'react-router-redux';
import { fetchClients } from '../App/actions';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    dispatch({ type: AUTHENTICATION_START });
    api.post('/login', data)
      .then(response => {
        if (isSuccess(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: LOGIN_SUCCESS });
          dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
          dispatch(fetchClients());
          dispatch(push('/jobs'));
        } else {
          const message = parseError(response, 'Error logging in');
          dispatch({ type: LOGIN_ERROR });
          dispatch({ type: AUTHENTICATION_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
