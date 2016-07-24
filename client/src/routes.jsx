import React from 'react';
import Home from './pages/Home';
import App from './containers/App';
import Reset from './containers/Reset';
import Login from './containers/Login';
import NotFound from './pages/NotFound';
import Signup from './containers/Signup';
import Forgot from './containers/Forgot';
import { push } from 'react-router-redux';
import Settings from './containers/Settings';
import Account from './containers/Account';
import Accounts from './containers/Accounts';
import { Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';

const requireAuthentication = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: state => state.app,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsJWTAuthenticated',
});

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot" component={Forgot} />
    <Route path="/reset/:token" component={Reset} />
    <Route path="/accounts" component={requireAuthentication(Accounts)} />
    <Route path="/accounts/:id" component={requireAuthentication(Account)} />
    <Route path="/settings" component={requireAuthentication(Settings)} />
    <Route path="*" component={NotFound} />
  </Route>
);
