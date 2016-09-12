import {
  FETCH_POSTS_START,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess } from '../../utils';

export function fetchPosts(accountSlug, params) {
  return dispatch => {
    dispatch({ type: FETCH_POSTS_START });
    api.get(`/accounts/${accountSlug}/posts`, { params: { ...params } })
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_POSTS_ERROR });
          const message = api.parseError(response, 'Error retrieving posts');
          dispatch({ type: SHOW_ALERT, alert: { klass: 'danger', message } });
        }
      });
  };
}

export function deletePost(accountSlug, id) {
  return dispatch => {
    api.delete(`/accounts/${accountSlug}/posts/${id}`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: DELETE_POST_SUCCESS, payload: response });
          dispatch({ type: SHOW_ALERT, alert: { klass: 'white', message: 'Post deleted' } });
        }
      });
  };
}
