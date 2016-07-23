import { LOCATION_CHANGE } from './constants';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../Login/constants';

const initialState = {
  user: {},
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
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
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
