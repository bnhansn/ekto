import React from 'react';
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import useScroll from 'react-router-scroll/lib/useScroll';
import { authenticate, locationChange } from './containers/App/actions';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
require('./styles/main.scss');

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  applyMiddleware(thunk, routingMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

// update location store on route changes
history.listen(() => store.dispatch(locationChange(location)));

// attempt login if token is stored
const token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(authenticate(JSON.parse(token)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>
  , document.getElementById('root')
);
