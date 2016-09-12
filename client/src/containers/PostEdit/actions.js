import { push } from 'react-router-redux';
import {
  FETCH_POST_START,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  UPDATE_POST_START,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchPost(accountSlug, id) {
  return dispatch => {
    dispatch({ type: FETCH_POST_START });
    api.fetch(`/accounts/${accountSlug}/posts/${id}`)
      .then(response => {
        dispatch({ type: FETCH_POST_SUCCESS, payload: response });
      })
      .catch(() => {
        dispatch({ type: FETCH_POST_ERROR });
        dispatch(push(`/accounts/${accountSlug}`));
      });
  };
}

export function updatePost(accountSlug, id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    api.patch(`/accounts/${accountSlug}/posts/${id}`, data)
      .then(response => {
        dispatch({ type: UPDATE_POST_SUCCESS, payload: response });
      })
      .catch(() => {
        dispatch({ type: UPDATE_POST_ERROR });
      });
  };
}

export function deletePost(accountSlug, id) {
  return dispatch => {
    api.delete(`/accounts/${accountSlug}/posts/${id}`)
      .then(() => {
        dispatch(push(`/accounts/${accountSlug}/posts`));
        dispatch({ type: SHOW_ALERT, klass: 'white', message: 'Post deleted' });
      })
      .catch(error => {
        const message = api.parseError(error, 'Error deleting post');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}
