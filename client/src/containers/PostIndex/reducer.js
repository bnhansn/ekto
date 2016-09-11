import {
  FETCH_POSTS_START,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_SUCCESS,
} from './constants';

const initialState = {
  meta: {},
  posts: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        posts: [],
        meta: {},
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meta: action.payload.data.meta,
        posts: action.payload.data.data,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        meta: {},
        posts: [],
        isLoading: false,
      };
    case DELETE_POST_SUCCESS: {
      const index = state.posts.map(x => x.id).indexOf(action.payload.data.data.id);
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          ...state.posts.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
}
