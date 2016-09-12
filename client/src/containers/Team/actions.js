import { reset } from 'redux-form';
import {
  SEARCH_USERS_START,
  SEARCH_USERS_ERROR,
  SEARCH_USERS_SUCCESS,
  INVITE_NEW_USER_START,
  INVITE_NEW_USER_ERROR,
  INVITE_NEW_USER_SUCCESS,
  INVITE_EXISTING_USER_START,
  INVITE_EXISTING_USER_ERROR,
  INVITE_EXISTING_USER_SUCCESS,
  REMOVE_TEAM_MEMBER_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function searchUsers(params) {
  return dispatch => {
    dispatch({ type: SEARCH_USERS_START });
    api.fetch('/users', params)
      .then(response => {
        dispatch({ type: SEARCH_USERS_SUCCESS, payload: response });
      })
      .catch(() => {
        dispatch({ type: SEARCH_USERS_ERROR });
      });
  };
}

export function inviteNewUser(accountId, data) {
  return dispatch => {
    dispatch({ type: INVITE_NEW_USER_START });
    api.post(`/accounts/${accountId}/team/invite_new`, data)
      .then(response => {
        dispatch({ type: INVITE_NEW_USER_SUCCESS, payload: response });
        dispatch(reset('inviteUser'));
      })
      .catch(error => {
        dispatch({ type: INVITE_NEW_USER_ERROR });
        const message = api.parseError(error, 'Error inviting user');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}

export function inviteExistingUser(accountId, data) {
  return dispatch => {
    dispatch({ type: INVITE_EXISTING_USER_START });
    api.post(`/accounts/${accountId}/team/invite_existing`, data)
      .then(response => {
        dispatch({ type: INVITE_EXISTING_USER_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: INVITE_EXISTING_USER_ERROR });
        const message = api.parseError(error, 'Error inviting user');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}

export function removeTeamMember(accountId, userId) {
  return dispatch => {
    api.post(`/accounts/${accountId}/team/remove`, { userId })
      .then(response => {
        dispatch({ type: REMOVE_TEAM_MEMBER_SUCCESS, payload: response });
        dispatch({ type: SHOW_ALERT, alert: { klass: 'white', message: 'User removed' } });
      })
      .catch(error => {
        const message = api.parseError(error, 'Error removing user');
        dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
      });
  };
}
