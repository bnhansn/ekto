import React from 'react';
import Home from './pages/Home';
import App from './containers/App';
import Reset from './containers/Reset';
import Login from './containers/Login';
import NotFound from './pages/NotFound';
import Signup from './containers/Signup';
import Forgot from './containers/Forgot';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot" component={Forgot} />
    <Route path="/reset/:token" component={Reset} />
    <Route path="*" component={NotFound} />
  </Route>
);
