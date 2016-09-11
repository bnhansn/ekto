import {
  CREATE_POST_START,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
} from './constants';

const initialState = {
  isSaving: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_START:
      return {
        ...state,
        isSaving: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isSaving: false,
      };
    case CREATE_POST_ERROR:
      return {
        ...state,
        isSaving: false,
      };
    default:
      return state;
  }
}
