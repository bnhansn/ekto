import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
} from './constants';

const initialState = {
  account: {},
  isLoading: false,
  finishedLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishedLoading: true,
        account: action.payload.data.data,
      };
    default:
      return state;
  }
}
