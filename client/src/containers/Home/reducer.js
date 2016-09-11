import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_START:
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
