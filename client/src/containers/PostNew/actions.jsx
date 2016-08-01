import {
  CREATE_POST_START,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { isSuccess, keyTransform, assignAttributes } from '../../utils';

export function createPost(accountSlug, data) {
  const attributes = keyTransform(data);
  const post = assignAttributes(attributes);
  return dispatch => {
    dispatch({ type: CREATE_POST_START });
    api.post(`/accounts/${accountSlug}/posts`, post)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: CREATE_POST_SUCCESS, payload: response });
          dispatch(push(`/accounts/${accountSlug}/posts/${response.data.data.id}`));
        } else {
          dispatch({ type: CREATE_POST_ERROR });
        }
      });
  };
}

export function publishPost(accountSlug, data) {
  const postData = { ...data, published: true };
  const attributes = keyTransform(postData);
  const post = assignAttributes(attributes);
  return dispatch => {
    dispatch({ type: CREATE_POST_START });
    api.post(`/accounts/${accountSlug}/posts`, post)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: CREATE_POST_SUCCESS, payload: response });
          dispatch(push(`/accounts/${accountSlug}/posts/${response.data.data.id}`));
        } else {
          dispatch({ type: CREATE_POST_ERROR });
        }
      });
  };
}
