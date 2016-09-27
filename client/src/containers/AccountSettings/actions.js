import { push } from 'react-router-redux';
import api from '../../api';
import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
} from './constants';
import { SHOW_ALERT } from '../Alert/constants';

export function updateAccount(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    api.patch(`/accounts/${id}`, data)
      .then(response => {
        const accountSlug = response.data.slug;
        dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
        // need to update slug in url if it changed
        dispatch(push(`/accounts/${accountSlug}/settings`));
        dispatch({ type: SHOW_ALERT, klass: 'white', message: 'Account updated' });
      })
      .catch(error => {
        dispatch({ type: UPDATE_ACCOUNT_ERROR });
        const message = api.parseError(error, 'Error updating account');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}

export function updateImage(id, data) {
  return dispatch => {
    api.patch(`/accounts/${id}`, data)
      .then(response => {
        dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
      });
  };
}

export function deleteAccount(accountId) {
  return dispatch => {
    api.delete(`/accounts/${accountId}`)
      .then(response => {
        const accountName = response.data.name;
        dispatch(push('/accounts'));
        dispatch({
          type: SHOW_ALERT,
          klass: 'white',
          message: `Account ${accountName} has been deleted`,
        });
      })
      .catch(error => {
        const message = api.parseError(error, 'Error deleting account');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}
