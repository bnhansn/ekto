import React from 'react';
import Home from './pages/Home';
import App from './containers/App';
import Team from './containers/Team';
import Login from './containers/Login';
import PostIndex from './containers/PostIndex';
import NotFound from './pages/NotFound';
import Signup from './containers/Signup';
import Account from './containers/Account';
import PostNew from './containers/PostNew';
import PostEdit from './containers/PostEdit';
import Settings from './containers/Settings';
import AccountIndex from './containers/AccountIndex';
import ResetPassword from './containers/ResetPassword';
import ForgotPassword from './containers/ForgotPassword';
import AccountSettings from './containers/AccountSettings';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { authenticate } from './containers/AuthenticationWrapper';
import { redirectAuthenticated } from './containers/RedirectWrapper';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={redirectAuthenticated(Home)} />
    <Route path="/login" component={redirectAuthenticated(Login)} />
    <Route path="/signup" component={redirectAuthenticated(Signup)} />
    <Route path="/forgot" component={redirectAuthenticated(ForgotPassword)} />
    <Route path="/reset/:token" component={redirectAuthenticated(ResetPassword)} />

    <Route path="/settings" component={authenticate(Settings)} />
    <Route path="/accounts" component={authenticate(AccountIndex)} />
    <Route path="/accounts/:accountSlug" component={authenticate(Account)}>
      <IndexRedirect to="/accounts/:accountSlug/posts" />
      <Route path="/accounts/:accountSlug/posts" component={authenticate(PostIndex)} />
      <Route path="/accounts/:accountSlug/team" component={authenticate(Team)} />
      <Route
        path="/accounts/:accountSlug/settings"
        component={authenticate(AccountSettings)}
      />
      <Route
        path="/accounts/:accountSlug/posts/new"
        component={authenticate(PostNew)}
      />
      <Route
        path="/accounts/:accountSlug/posts/:id"
        component={authenticate(PostEdit)}
      />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
