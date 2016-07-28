import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { reset } from 'redux-form';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function updateAccount(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    api.patch(`/accounts/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
          dispatch(reset('accountSettings'));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'info', message: 'Account updated successfully' },
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