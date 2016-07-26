import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { isSuccess } from '../../utils';

export function fetchAccount(accountSlug) {
  return dispatch => {
    dispatch({ type: FETCH_ACCOUNT_START });
    api.get(`/accounts/${accountSlug}`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: response });
        } else {
          dispatch(push('/'));
        }
      });
  };
}
