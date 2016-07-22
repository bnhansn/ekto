import {
  SHOW_ALERT,
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { API_URL } from 'config'; // eslint-disable-line
import { push } from 'react-router-redux';

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    axios({
      method: 'post',
      url: `${API_URL}/login`,
      data,
    })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.meta.token));
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        dispatch(push('/accounts'));
      })
      .catch(error => {
        const message = get(error, 'response.data.errors[0].title', 'Error logging in');
        dispatch({ type: LOGIN_ERROR });
        dispatch({
          type: SHOW_ALERT,
          alert: { klass: 'danger', message },
        });
      });
  };
}
