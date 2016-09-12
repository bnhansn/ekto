import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './containers/App/reducer';
import teamReducer from './containers/Team/reducer';
import homeReducer from './containers/Home/reducer';
import alertReducer from './containers/Alert/reducer';
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
  team: teamReducer,
  form: formReducer,
  home: homeReducer,
  posts: postsReducer,
  alert: alertReducer,
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
