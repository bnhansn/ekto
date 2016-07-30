import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_ERROR,
  FETCH_ACCOUNT_SUCCESS,
} from './constants';
import {
  UPDATE_ACCOUNT_SUCCESS,
  FETCH_DOMAINS_ERROR,
  FETCH_DOMAINS_SUCCESS,
  CREATE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_SUCCESS,
} from '../AccountSettings/constants';

const initialState = {
  account: {},
  domains: [],
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
    case FETCH_DOMAINS_SUCCESS:
      return {
        ...state,
        domains: action.payload.data.data,
      };
    case FETCH_DOMAINS_ERROR:
      return {
        ...state,
        domains: [],
      };
    case CREATE_DOMAIN_SUCCESS:
      return {
        ...state,
        domains: [
          ...state.domains,
          action.payload.data.data,
        ],
      };
    case DELETE_DOMAIN_SUCCESS: {
      const index = state.domains.map(x => x.id).indexOf(action.payload.data.data.id);
      return {
        ...state,
        domains: [
          ...state.domains.slice(0, index),
          ...state.domains.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
}
