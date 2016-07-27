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
import PostNew from './containers/PostNew';
import PostEdit from './containers/PostEdit';
import Settings from './containers/Settings';
import Accounts from './containers/Accounts';
import AccountSettings from './containers/AccountSettings';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { authenticate } from './containers/Authenticate';
import { redirectAuthenticated } from './containers/Redirect';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={redirectAuthenticated(Login)} />
    <Route path="/signup" component={redirectAuthenticated(Signup)} />
    <Route path="/forgot" component={redirectAuthenticated(Forgot)} />
    <Route path="/reset/:token" component={redirectAuthenticated(Reset)} />

    <Route path="/settings" component={authenticate(Settings)} />
    <Route path="/accounts" component={authenticate(Accounts)} />
    <Route path="/accounts/:accountSlug" component={authenticate(Account)}>
      <IndexRedirect to="/accounts/:accountSlug/posts" />
      <Route path="/accounts/:accountSlug/posts" component={authenticate(Posts)} />
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
        path="/accounts/:accountSlug/posts/:postSlug"
        component={authenticate(PostEdit)}
      />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
