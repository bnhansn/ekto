import {
  FETCH_TEAM_START,
  FETCH_TEAM_ERROR,
  FETCH_TEAM_SUCCESS,
} from './constants';
import api from '../../api';
import { SHOW_ALERT } from '../Alert/constants';
import { isSuccess, parseError } from '../../utils';

export function fetchTeam(id) {
  return dispatch => {
    dispatch({ type: FETCH_TEAM_START });
    api.get(`/accounts/${id}/team`)
      .then(response => {
        if (isSuccess(response)) {
          dispatch({ type: FETCH_TEAM_SUCCESS, payload: response });
        } else {
          dispatch({ type: FETCH_TEAM_ERROR });
          const message = parseError(response, 'Error retrieving team');
          dispatch({
            type: SHOW_ALERT,
            alert: { klass: 'danger', message },
          });
        }
      });
  };
}
