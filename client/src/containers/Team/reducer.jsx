import {
  FETCH_TEAM_START,
  FETCH_TEAM_ERROR,
  FETCH_TEAM_SUCCESS,
} from './constants';

const initialState = {
  team: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM_START:
      return {
        ...state,
        team: [],
        isLoading: true,
      };
    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        team: action.payload.data.data,
      };
    case FETCH_TEAM_ERROR:
      return {
        ...state,
        isLoading: false,
        team: [],
      };
    default:
      return state;
  }
}
