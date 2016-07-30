import {
  UPDATE_SETTINGS_START,
  UPDATE_SETTINGS_ERROR,
  UPDATE_SETTINGS_SUCCESS,
} from './constants';
import api from '../../api';
import { reset } from 'redux-form';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function updateSettings(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_SETTINGS_START });
    api.patch(`/users/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_SETTINGS_SUCCESS, payload: response });
          dispatch(reset('settings'));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'white', message: 'Account updated' },
          });
        } else {
          dispatch({ type: UPDATE_SETTINGS_ERROR });
          const message = parseError(response, 'Error updating account');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
