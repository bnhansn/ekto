import { push } from 'react-router-redux';
import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function forgotPassword(data) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_START });
    api.post('/forgot', data)
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        dispatch(push('/login'));
        dispatch({
          type: SHOW_ALERT,
          alert: {
            klass: 'info',
            message: 'Please check your email for a password reset link',
          },
        });
      })
      .catch(error => {
        dispatch({ type: FORGOT_PASSWORD_ERROR });
        const message = api.parseError(error, 'Error resetting password');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}
