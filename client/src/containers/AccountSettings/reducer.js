import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  CREATE_DOMAIN_START,
  CREATE_DOMAIN_ERROR,
  CREATE_DOMAIN_SUCCESS,
} from './constants';

const initialState = {
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
    case CREATE_DOMAIN_START:
      return {
        ...state,
        isCreatingDomain: true,
      };
    case CREATE_DOMAIN_SUCCESS:
      return {
        ...state,
        isCreatingDomain: false,
      };
    case CREATE_DOMAIN_ERROR:
      return {
        ...state,
        isCreatingDomain: false,
      };
    default:
      return state;
  }
}
