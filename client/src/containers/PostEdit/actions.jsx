import {
  FETCH_POST_START,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  UPDATE_POST_START,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { isSuccess } from '../../utils';
import { push } from 'react-router-redux';

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
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    api.patch(`/accounts/${accountSlug}/posts/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: UPDATE_POST_SUCCESS, payload: response });
        } else {
          dispatch({ type: UPDATE_POST_ERROR });
        }
      });
  };
}
