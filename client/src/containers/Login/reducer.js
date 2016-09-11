import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isSubmitting: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
