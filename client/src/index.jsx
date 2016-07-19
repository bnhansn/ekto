import React from 'react';
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { authenticate } from './containers/App/actions';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
require('./styles/main.scss');

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  applyMiddleware(thunk, routingMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(authenticate(JSON.parse(token)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('root')
);
