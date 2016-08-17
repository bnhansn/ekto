import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_TEAM_START,
  FETCH_TEAM_SUCCESS,
  FETCH_DOMAINS_START,
  FETCH_DOMAINS_SUCCESS,
  FETCH_DOMAINS_ERROR,
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

export function fetchTeam(accountSlug) {
  return dispatch => {
    dispatch({ type: FETCH_TEAM_START });
    api.get(`/accounts/${accountSlug}/users`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_TEAM_SUCCESS, payload: response });
        }
      });
  };
}

export function fetchDomains(accountSlug) {
  return dispatch => {
    dispatch({ type: FETCH_DOMAINS_START });
    api.get(`/accounts/${accountSlug}/domains`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_DOMAINS_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_DOMAINS_ERROR });
        }
      });
  };
}
