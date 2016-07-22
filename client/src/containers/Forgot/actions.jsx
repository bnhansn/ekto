import {
  SHOW_ALERT,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { API_URL } from 'config'; // eslint-disable-line
import { push } from 'react-router-redux';

export function forgotPassword(data) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_START });
    axios({
      method: 'post',
      url: `${API_URL}/forgot`,
      data,
    })
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        dispatch(push('/login'));
      })
      .catch(error => {
        const message = get(error, 'response.data.errors[0].title', 'Error resetting password');
        dispatch({ type: FORGOT_PASSWORD_ERROR });
        dispatch({
          type: SHOW_ALERT,
          alert: { klass: 'danger', message },
        });
      });
  };
}
