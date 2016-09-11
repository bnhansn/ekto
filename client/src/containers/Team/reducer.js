import {
  SEARCH_USERS_START,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR,
  INVITE_NEW_USER_START,
  INVITE_NEW_USER_ERROR,
  INVITE_NEW_USER_SUCCESS,
  INVITE_EXISTING_USER_START,
  INVITE_EXISTING_USER_ERROR,
  INVITE_EXISTING_USER_SUCCESS,
} from './constants';

const initialState = {
  searchedUsers: [],
  isSearchingUsers: false,
  isInvitingNewUser: false,
  isInvitingExistingUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS_START:
      return {
        ...state,
        searchedUsers: [],
        isSearchingUsers: true,
      };
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        searchedUsers: action.payload.data.data,
        isSearchingUsers: false,
      };
    case SEARCH_USERS_ERROR:
      return {
        ...state,
        searchedUsers: [],
        isSearchingUsers: false,
      };
    case INVITE_NEW_USER_START:
      return {
        ...state,
        isInvitingNewUser: true,
      };
    case INVITE_NEW_USER_SUCCESS:
      return {
        ...state,
        isInvitingNewUser: false,
      };
    case INVITE_NEW_USER_ERROR:
      return {
        ...state,
        isInvitingNewUser: false,
      };
    case INVITE_EXISTING_USER_START:
      return {
        ...state,
        isInvitingExistingUser: true,
      };
    case INVITE_EXISTING_USER_SUCCESS:
      return {
        ...state,
        isInvitingExistingUser: false,
      };
    case INVITE_EXISTING_USER_ERROR:
      return {
        ...state,
        isInvitingExistingUser: false,
      };
    default:
      return state;
  }
}
