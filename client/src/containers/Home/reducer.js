import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from './constants';

const initialState = {
  isSigningUp: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        isSigningUp: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isSigningUp: false,
      };
    default:
      return state;
  }
}
