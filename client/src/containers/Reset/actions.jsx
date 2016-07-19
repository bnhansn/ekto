import {
  SHOW_ALERT,
  LOGIN_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_ATTEMPT,
  RESET_PASSWORD_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { API_URL } from 'config'; // eslint-disable-line

export function resetPassword(data) {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD_ATTEMPT });
    axios({
      method: 'post',
      url: `${API_URL}/reset`,
      data,
    })
      .then(response => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        dispatch({ type: LOGIN_SUCCESS, payload: response });
      })
      .catch(error => {
        const message = get(error, 'response.data.errors[0].title', 'Error resetting password');
        dispatch({ type: RESET_PASSWORD_ERROR });
        dispatch({
          type: SHOW_ALERT,
          alert: { type: 'danger', message },
        });
      });
  };
}
