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
import { isSuccess } from '../../utils';

export function searchUsers(search) {
  return dispatch => {
    dispatch({ type: SEARCH_USERS_START });
    api.get('/users', { params: { search } })
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: SEARCH_USERS_SUCCESS, payload: response });
        } else {
          dispatch({ type: SEARCH_USERS_ERROR });
        }
      });
  };
}

export function inviteNewUser(accountId, data) {
  return dispatch => {
    dispatch({ type: INVITE_NEW_USER_START });
    api.post(`/accounts/${accountId}/team/invite_new`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: INVITE_NEW_USER_SUCCESS, payload: response });
          dispatch(reset('inviteUser'));
        } else {
          dispatch({ type: INVITE_NEW_USER_ERROR });
          const message = api.parseError(response, 'Error inviting user');
          dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
        }
      });
  };
}

export function inviteExistingUser(accountId, data) {
  return dispatch => {
    dispatch({ type: INVITE_EXISTING_USER_START });
    api.post(`/accounts/${accountId}/team/invite_existing`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: INVITE_EXISTING_USER_SUCCESS, payload: response });
        } else {
          dispatch({ type: INVITE_EXISTING_USER_ERROR });
          const message = api.parseError(response, 'Error inviting user');
          dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
        }
      });
  };
}

export function removeTeamMember(accountId, userId) {
  return dispatch => {
    api.post(`/accounts/${accountId}/team/remove`, { userId })
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: REMOVE_TEAM_MEMBER_SUCCESS, payload: response });
          dispatch({ type: SHOW_ALERT, alert: { klass: 'white', message: 'User removed' } });
        } else {
          const message = api.parseError(response, 'Error removing user');
          dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
        }
      });
  };
}
