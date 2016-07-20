import {
  SHOW_ALERT,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ATTEMPT,
  SIGNUP_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { keyTransform } from '../../utils';
import { API_URL } from 'config'; // eslint-disable-line

export function signup(data) {
  return dispatch => {
    dispatch({ type: SIGNUP_ATTEMPT });
    axios({
      method: 'post',
      url: `${API_URL}/signup`,
      data: keyTransform(data),
    })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.meta.token));
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch({ type: LOGIN_SUCCESS, payload: response });
      })
      .catch(error => {
        const message = get(error, 'response.data.errors[0].title', 'Error signing up');
        dispatch({ type: SIGNUP_ERROR });
        dispatch({
          type: SHOW_ALERT,
          alert: { type: 'danger', message },
        });
      });
  };
}
