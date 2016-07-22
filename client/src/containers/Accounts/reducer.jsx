import {
  FETCH_ACCOUNTS_START,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
} from './constants';

const initialState = {
  accounts: [],
  isLoading: false,
  finishedLoading: false,
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
        accounts: action.payload.data.data,
      };
    case FETCH_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        finishedLoading: true,
      };
    default:
      return state;
  }
}
