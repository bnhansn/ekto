import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function forgotPassword(data) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_START });
    api.post('/forgot', data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          dispatch(push('/login'));
          dispatch({
            type: SHOW_ALERT,
            alert: {
              klass: 'info',
              message: 'Please check your email for a password reset link',
            },
          });
        } else {
          const message = parseError(response, 'Error resetting password');
          dispatch({ type: FORGOT_PASSWORD_ERROR });
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
