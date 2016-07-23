import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    api.post('/login', data)
      .then(response => {
        if (api.success(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: LOGIN_SUCCESS, payload: response });
          dispatch(push('/accounts'));
        } else {
          const message = get(response, 'data.errors[0].title', 'Error logging in');
          dispatch({ type: LOGIN_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
