import {
  FETCH_POST_START,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
} from './constants';
import api from '../../api';
import { isSuccess } from '../../utils';
import { push } from 'react-router-redux';

export function fetchPost(accountSlug, postSlug) {
  return dispatch => {
    dispatch({ type: FETCH_POST_START });
    api.get(`/accounts/${accountSlug}/posts/${postSlug}`)
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
