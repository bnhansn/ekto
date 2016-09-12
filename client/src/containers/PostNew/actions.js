import { push } from 'react-router-redux';
import {
  CREATE_POST_START,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
} from './constants';
import api from '../../api';

export function createPost(accountSlug, data) {
  return dispatch => {
    dispatch({ type: CREATE_POST_START });
    api.post(`/accounts/${accountSlug}/posts`, data)
      .then(response => {
        dispatch({ type: CREATE_POST_SUCCESS, payload: response });
        dispatch(push(`/accounts/${accountSlug}/posts/${response.data.id}`));
      })
      .catch(() => {
        dispatch({ type: CREATE_POST_ERROR });
      });
  };
}
