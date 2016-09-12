import { SHOW_ALERT, HIDE_ALERT } from './constants';

const initialState = { klass: '', message: '', icon: '', visible: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        visible: true,
        icon: action.icon,
        klass: action.klass,
        message: action.message,
      };
    case HIDE_ALERT:
      return {
        ...state,
        icon: '',
        klass: '',
        message: '',
        visible: false,
      };
    default:
      return state;
  }
}
