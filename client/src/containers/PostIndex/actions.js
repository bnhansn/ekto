import {
  FETCH_POSTS_START,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchPosts(accountSlug, params) {
  return dispatch => {
    dispatch({ type: FETCH_POSTS_START });
    api.fetch(`/accounts/${accountSlug}/posts`, params)
      .then(response => {
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: FETCH_POSTS_ERROR });
        const message = api.parseError(error, 'Error retrieving posts');
        dispatch({ type: SHOW_ALERT, klass: 'danger', message });
      });
  };
}

export function deletePost(accountSlug, id) {
  return dispatch => {
    api.delete(`/accounts/${accountSlug}/posts/${id}`)
      .then(response => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: response });
        dispatch({ type: SHOW_ALERT, klass: 'white', message: 'Post deleted' });
      });
  };
}
