import {
  SHOW_ALERT,
  LOGIN_ERROR,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { API_URL } from 'config'; // eslint-disable-line

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_ATTEMPT });
    axios({
      method: 'post',
      url: `${API_URL}/login`,
      data,
    })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.meta.token));
        dispatch({ type: LOGIN_SUCCESS, payload: response });
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
