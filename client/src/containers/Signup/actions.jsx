import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { SHOW_ALERT } from '../Alert/constants';
import { LOGIN_SUCCESS } from '../Login/constants';

export function signup(data) {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    api.post('/signup', data)
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: SIGNUP_SUCCESS });
          dispatch({ type: LOGIN_SUCCESS, payload: response });
        } else {
          const message = get(response, 'data.errors[0].title', 'Error signing up');
          dispatch({ type: SIGNUP_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { type: 'danger', message },
          });
        }
      });
  };
}
