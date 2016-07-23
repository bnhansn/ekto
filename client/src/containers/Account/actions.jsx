import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';

export function fetchAccount(id) {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNT_START });
    api.get(`/accounts/${id}`)
      .then(response => {
        if (api.success(response)) {
          dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: response });
        } else {
          dispatch(push('/'));
        }
      });
  };
}
