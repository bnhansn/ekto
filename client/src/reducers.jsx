import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './containers/Alert/reducer';
import loginReducer from './containers/Login/reducer';
import postsReducer from './containers/Posts/reducer';
import postReducer from './containers/PostEdit/reducer';
import signupReducer from './containers/Signup/reducer';
import accountReducer from './containers/Account/reducer';
import settingsReducer from './containers/Settings/reducer';
import accountsReducer from './containers/Accounts/reducer';
import resetPasswordReducer from './containers/ResetPassword/reducer';
import forgotPasswordReducer from './containers/ForgotPassword/reducer';
import accountSettingsReducer from './containers/AccountSettings/reducer';

const reducers = combineReducers({
  app: appReducer,
  form: formReducer,
  post: postReducer,
  posts: postsReducer,
  alert: alertReducer,
  login: loginReducer,
  signup: signupReducer,
  routing: routerReducer,
  account: accountReducer,
  accounts: accountsReducer,
  settings: settingsReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  accountSettings: accountSettingsReducer,
});

export default reducers;
