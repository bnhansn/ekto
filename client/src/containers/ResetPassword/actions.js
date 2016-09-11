import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';
import { AUTHENTICATION_SUCCESS } from '../App/constants';
import { isSuccess, parseError } from '../../utils';

export function resetPassword(data) {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD_START });
    api.post('/reset', data)
      .then(response => {
        if (isSuccess(response)) {
          localStorage.setItem('token', JSON.stringify(response.data.meta.token));
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'success', message: 'Your password has been updated' },
          });
        } else {
          const message = parseError(response, 'Error resetting password');
          dispatch({ type: RESET_PASSWORD_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
