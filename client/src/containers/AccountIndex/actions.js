import { reset } from 'redux-form';
import {
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchAccounts() {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNTS_START });
    api.fetch('/accounts')
      .then(response => {
        dispatch({ type: FETCH_ACCOUNTS_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: FETCH_ACCOUNTS_ERROR });
        const message = api.parseError(error, 'Error retrieving accounts');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}

export function createAccount(data) {
  return dispatch => {
    dispatch({ type: CREATE_ACCOUNT_START });
    api.post('/accounts', data)
      .then(response => {
        dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response });
        dispatch(reset('newAccount'));
      })
      .catch(error => {
        dispatch({ type: CREATE_ACCOUNT_ERROR });
        const message = api.parseError(error, 'Error creating account');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}
