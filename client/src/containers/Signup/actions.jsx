import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { LOGIN_SUCCESS } from '../Login/constants';

export function signup(data) {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    api.post('/signup', data)
      .then(response => {
        if (api.success(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: SIGNUP_SUCCESS });
          dispatch({ type: LOGIN_SUCCESS, payload: response });
          dispatch(push('/accounts'));
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
