import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  FETCH_DOMAINS_ERROR,
  FETCH_DOMAINS_SUCCESS,
  CREATE_DOMAIN_SUCCESS,
  CREATE_DOMAIN_ERROR,
  CREATE_DOMAIN_START,
  DELETE_DOMAIN_SUCCESS,
} from './constants';
import api from '../../api';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function updateAccount(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    api.patch(`/accounts/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          const accountSlug = response.data.data.slug;
          dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
          // need to update slug in url if it changed
          dispatch(push(`/accounts/${accountSlug}/settings`));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'white', message: 'Account updated' },
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

export function fetchDomains(id) {
  return dispatch => {
    api.get(`/accounts/${id}/domains`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_DOMAINS_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_DOMAINS_ERROR });
        }
      });
  };
}

export function createDomain(id, data) {
  return dispatch => {
    dispatch({ type: CREATE_DOMAIN_START });
    api.post(`/accounts/${id}/domains`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: CREATE_DOMAIN_SUCCESS, payload: response });
          dispatch(reset('createDomain'));
        } else {
          dispatch({ type: CREATE_DOMAIN_ERROR });
          const message = parseError(response, 'Error creating domain');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}

export function deleteDomain(accountId, id) {
  return dispatch => {
    api.delete(`/accounts/${accountId}/domains/${id}`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: DELETE_DOMAIN_SUCCESS, payload: response });
        }
      });
  };
}

export function deleteAccount(accountId) {
  return dispatch => {
    api.delete(`/accounts/${accountId}`)
      .then(response => {
        if (isSuccess(response)) {
          const accountName = response.data.data.name;
          dispatch(push('/accounts'));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'white', message: `Account ${accountName} has been deleted` },
          });
        } else {
          const message = parseError(response, 'Error deleting account');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
