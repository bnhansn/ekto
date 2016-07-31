import {
  FETCH_POST_START,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  UPDATE_POST_START,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from './constants';

const initialState = {
  post: {},
  isSaving: false,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload.data.data,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_POST_START:
      return {
        ...state,
        isSaving: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        isSaving: false,
        post: action.payload.data.data,
      };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        isSaving: false,
      };
    default:
      return state;
  }
}
