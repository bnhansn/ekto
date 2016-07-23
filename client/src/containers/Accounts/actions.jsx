import {
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { reset } from 'redux-form';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchAccounts() {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNTS_START });
    api.get('/accounts')
      .then(response => {
        if (api.success(response)) {
          dispatch({ type: FETCH_ACCOUNTS_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_ACCOUNTS_ERROR });
          const message = get(response, 'data.errors[0].title', 'Error retrieving accounts');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}

export function createAccount(data) {
  return dispatch => {
    dispatch({ type: CREATE_ACCOUNT_START });
    api.post('/accounts', data)
      .then(response => {
        if (api.success(response)) {
          dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response });
          dispatch(reset('newAccount'));
        } else {
          dispatch({ type: CREATE_ACCOUNT_ERROR });
        }
      });
  };
}
