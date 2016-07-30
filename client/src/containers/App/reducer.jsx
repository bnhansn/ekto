import {
  LOGOUT_SUCCESS,
  LOCATION_CHANGE,
  AUTHENTICATION_START,
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS,
} from './constants';
import { UPDATE_SETTINGS_SUCCESS } from '../Settings/constants';

const initialState = {
  user: {},
  clients: [],
  location: {},
  isAuthenticated: false,
  isAuthenticating: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_START:
      return {
        ...state,
        isAuthenticating: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.payload.data.data,
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        user: {},
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        clients: [],
        isAuthenticated: false,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        location: { ...location },
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
      };
    default:
      return state;
  }
}
