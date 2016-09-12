import { reset } from 'redux-form';
import {
  UPDATE_SETTINGS_START,
  UPDATE_SETTINGS_ERROR,
  UPDATE_SETTINGS_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function updateSettings(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_SETTINGS_START });
    api.patch(`/users/${id}`, data)
      .then(response => {
        dispatch({ type: UPDATE_SETTINGS_SUCCESS, payload: response });
        dispatch(reset('settings'));
        dispatch({ type: SHOW_ALERT, alert: { klass: 'white', message: 'Account updated' } });
      })
      .catch(error => {
        dispatch({ type: UPDATE_SETTINGS_ERROR });
        const message = api.parseError(error, 'Error updating account');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}
