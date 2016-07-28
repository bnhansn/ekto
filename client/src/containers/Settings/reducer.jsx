import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
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
    default:
      return state;
  }
}
