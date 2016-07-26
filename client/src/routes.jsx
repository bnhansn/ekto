import React from 'react';
import Home from './pages/Home';
import App from './containers/App';
import Team from './containers/Team';
import Reset from './containers/Reset';
import Login from './containers/Login';
import Posts from './containers/Posts';
import NotFound from './pages/NotFound';
import Signup from './containers/Signup';
import Forgot from './containers/Forgot';
import Account from './containers/Account';
import { push } from 'react-router-redux';
import Settings from './containers/Settings';
import Accounts from './containers/Accounts';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import AccountSettings from './containers/AccountSettings';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

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
    <Route path="/settings" component={requireAuthentication(Settings)} />
    <Route path="/accounts" component={requireAuthentication(Accounts)} />
    <Route path="/accounts/:slug" component={requireAuthentication(Account)}>
      <IndexRedirect to="/accounts/:slug/posts" />
      <Route path="/accounts/:slug/posts" component={requireAuthentication(Posts)} />
      <Route path="/accounts/:slug/team" component={requireAuthentication(Team)} />
      <Route path="/accounts/:slug/settings" component={requireAuthentication(AccountSettings)} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
