import {
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchAccounts() {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNTS_START });
    api.get('/accounts')
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
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
