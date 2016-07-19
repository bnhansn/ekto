import { SHOW_ALERT, HIDE_ALERT } from './constants';

const initialState = { klass: '', message: '', visible: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        ...action.alert,
        visible: true,
      };
    case HIDE_ALERT:
      return {
        ...state,
        klass: '',
        message: '',
        visible: false,
      };
    default:
      return state;
  }
}
