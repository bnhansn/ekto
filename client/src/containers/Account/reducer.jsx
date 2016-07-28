import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_ERROR,
  FETCH_ACCOUNT_SUCCESS,
} from './constants';
import { UPDATE_ACCOUNT_SUCCESS } from '../AccountSettings/constants';

const initialState = {
  account: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_START:
      return {
        ...state,
        account: {},
        isLoading: true,
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: action.payload.data.data,
      };
    case FETCH_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        account: {},
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.payload.data.data,
      };
    default:
      return state;
  }
}
