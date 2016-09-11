import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_START:
      return {
        ...state,
        isSubmitting: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
