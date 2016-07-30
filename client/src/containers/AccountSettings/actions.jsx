import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
} from './constants';
import api from '../../api';
import { push } from 'react-router-redux';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function updateAccount(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    api.patch(`/accounts/${id}`, data)
      .then(response => {
        if (isSuccess(response)) {
          const accountSlug = response.data.data.attributes.slug;
          dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response });
          // need to update slug in url if it changed
          dispatch(push(`/accounts/${accountSlug}/settings`));
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'white', message: 'Account updated' },
          });
        } else {
          dispatch({ type: UPDATE_ACCOUNT_ERROR });
          const message = parseError(response, 'Error updating account');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
