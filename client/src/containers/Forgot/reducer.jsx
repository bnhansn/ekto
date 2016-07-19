import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_ATTEMPT,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_ATTEMPT:
      return {
        ...state,
        isSubmitting: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
