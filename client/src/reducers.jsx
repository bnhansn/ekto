import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './containers/Home/reducer';
import alertReducer from './containers/Alert/reducer';
import loginReducer from './containers/Login/reducer';
import postNewReducer from './containers/PostNew/reducer';
import accountReducer from './containers/Account/reducer';
import postsReducer from './containers/PostIndex/reducer';
import postEditReducer from './containers/PostEdit/reducer';
import settingsReducer from './containers/Settings/reducer';
import accountsReducer from './containers/AccountIndex/reducer';
import resetPasswordReducer from './containers/ResetPassword/reducer';
import forgotPasswordReducer from './containers/ForgotPassword/reducer';
import accountSettingsReducer from './containers/AccountSettings/reducer';

const reducers = combineReducers({
  app: appReducer,
  form: formReducer,
  posts: postsReducer,
  alert: alertReducer,
  login: loginReducer,
  signup: homeReducer,
  routing: routerReducer,
  account: accountReducer,
  postNew: postNewReducer,
  postEdit: postEditReducer,
  accounts: accountsReducer,
  settings: settingsReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  accountSettings: accountSettingsReducer,
});

export default reducers;
