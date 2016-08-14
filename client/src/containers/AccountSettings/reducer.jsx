import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  FETCH_DOMAINS_START,
  FETCH_DOMAINS_SUCCESS,
  FETCH_DOMAINS_ERROR,
  CREATE_DOMAIN_START,
  CREATE_DOMAIN_ERROR,
  CREATE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_SUCCESS,
} from './constants';

const initialState = {
  domains: [],
  isSubmitting: false,
  isCreatingDomain: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT_START:
      return {
        ...state,
        isSubmitting: true,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case UPDATE_ACCOUNT_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    case FETCH_DOMAINS_START:
      return {
        ...state,
        domains: [],
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
    case CREATE_DOMAIN_START:
      return {
        ...state,
        isCreatingDomain: true,
      };
    case CREATE_DOMAIN_SUCCESS:
      return {
        ...state,
        isCreatingDomain: false,
        domains: [
          ...state.domains,
          action.payload.data.data,
        ],
      };
    case CREATE_DOMAIN_ERROR:
      return {
        ...state,
        isCreatingDomain: false,
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
