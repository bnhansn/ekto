import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { reset } from 'redux-form';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function updateSettings(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    api.patch(`/users/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
          dispatch(reset('settings'));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'success', message: 'Account updated successfully' },
          });
        } else {
          dispatch({ type: UPDATE_ACCOUNT_ERROR });
          const message = parseError(response, 'Error updating account');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
