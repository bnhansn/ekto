import {
  SIGNUP_ERROR,
  SIGNUP_ATTEMPT,
  SIGNUP_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_ATTEMPT:
      return {
        ...state,
        isSubmitting: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
