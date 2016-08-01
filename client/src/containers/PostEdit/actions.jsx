import {
  FETCH_POST_START,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  UPDATE_POST_START,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError, keyTransform, assignAttributes } from '../../utils';

export function fetchPost(accountSlug, id) {
  return dispatch => {
    dispatch({ type: FETCH_POST_START });
    api.get(`/accounts/${accountSlug}/posts/${id}`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_POST_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_POST_ERROR });
          dispatch(push(`/accounts/${accountSlug}`));
        }
      });
  };
}

export function updatePost(accountSlug, id, data) {
  const attributes = keyTransform(data);
  const post = assignAttributes(attributes);
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    api.patch(`/accounts/${accountSlug}/posts/${id}`, post)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_POST_SUCCESS, payload: response });
        } else {
          dispatch({ type: UPDATE_POST_ERROR });
        }
      });
  };
}

export function publishPost(accountSlug, id, data) {
  const postData = { ...data, published: true };
  const attributes = keyTransform(postData);
  const post = assignAttributes(attributes);
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    api.patch(`/accounts/${accountSlug}/posts/${id}`, post)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_POST_SUCCESS, payload: response });
        } else {
          dispatch({ type: UPDATE_POST_ERROR });
        }
      });
  };
}

export function unpublishPost(accountSlug, id, data) {
  const postData = { ...data, published: false };
  const attributes = keyTransform(postData);
  const post = assignAttributes(attributes);
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    api.patch(`/accounts/${accountSlug}/posts/${id}`, post)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_POST_SUCCESS, payload: response });
        } else {
          dispatch({ type: UPDATE_POST_ERROR });
        }
      });
  };
}

export function deletePost(accountSlug, id) {
  return dispatch => {
    api.delete(`/accounts/${accountSlug}/posts/${id}`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch(push(`/accounts/${accountSlug}/posts`));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'white', message: 'Post deleted' },
          });
        } else {
          const message = parseError(response, 'Error deleting post');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
