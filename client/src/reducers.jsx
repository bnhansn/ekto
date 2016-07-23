import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './containers/Alert/reducer';
import loginReducer from './containers/Login/reducer';
import resetReducer from './containers/Reset/reducer';
import signupReducer from './containers/Signup/reducer';
import forgotReducer from './containers/Forgot/reducer';
import accountReducer from './containers/Account/reducer';
import accountsReducer from './containers/Accounts/reducer';

const reducers = combineReducers({
  app: appReducer,
  form: formReducer,
  alert: alertReducer,
  reset: resetReducer,
  login: loginReducer,
  signup: signupReducer,
  forgot: forgotReducer,
  routing: routerReducer,
  account: accountReducer,
  accounts: accountsReducer,
});

export default reducers;
