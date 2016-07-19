import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './constants';

const initialState = {
  user: {},
  token: null,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.data.attributes,
        token: action.payload.data.meta.token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
