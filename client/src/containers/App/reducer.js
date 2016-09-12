import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
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
  isLoggingIn: false,
  isAuthenticated: false,
  isAuthenticating: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.payload.data,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
      };
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
        user: action.payload.data,
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
        location: { ...action.location },
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      };
    default:
      return state;
  }
}
