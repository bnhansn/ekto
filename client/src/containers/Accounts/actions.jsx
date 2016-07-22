import {
  SHOW_ALERT,
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
} from './constants';
import axios from 'axios';
import get from 'lodash/get';
import { API_URL } from 'config'; // eslint-disable-line

export function fetchAccounts(token) {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNTS_START });
    axios.get(`${API_URL}/accounts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        dispatch({ type: FETCH_ACCOUNTS_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: FETCH_ACCOUNTS_ERROR });
        const message = get(error, 'response.data.errors[0].title', 'Error retrieving accounts');
        dispatch({
          type: SHOW_ALERT,
          alert: { klass: 'danger', message },
        });
      });
  };
}
