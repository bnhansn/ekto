import {
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
} from './constants';

const initialState = {
  accounts: [],
  isLoading: false,
  finishedLoading: false,
  isSavingNewAccount: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishedLoading: true,
        accounts: action.payload.data,
      };
    case FETCH_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        finishedLoading: true,
      };
    case CREATE_ACCOUNT_START:
      return {
        ...state,
        isSavingNewAccount: true,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isSavingNewAccount: false,
        accounts: [...state.accounts, action.payload.data],
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        isSavingNewAccount: false,
      };
    default:
      return state;
  }
}
