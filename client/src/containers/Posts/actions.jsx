import {
  FETCH_POSTS_START,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
} from './constants';
import api from '../../api';
import get from 'lodash/get';
import { SHOW_ALERT } from '../Alert/constants';

export function fetchPosts(accountSlug) {
  return dispatch => {
    dispatch({ type: FETCH_POSTS_START });
    api.get(`/accounts/${accountSlug}/posts`)
      .then(response => {
        if (api.success(response)) {
          dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_POSTS_ERROR });
          const message = get(response, 'data.errors[0].title', 'Error retrieving posts');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
