import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOCATION_CHANGE,
} from './constants';

const initialState = {
  user: {},
  token: null,
  location: {},
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
    case LOCATION_CHANGE:
      return {
        ...state,
        location: { ...location },
      };
    default:
      return state;
  }
}
