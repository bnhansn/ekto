import {
  UPDATE_SETTINGS_START,
  UPDATE_SETTINGS_ERROR,
  UPDATE_SETTINGS_SUCCESS,
} from './constants';

const initialState = {
  isSubmitting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_START:
      return {
        ...state,
        isSubmitting: true,
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
