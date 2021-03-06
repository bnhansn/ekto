import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import useScroll from 'react-router-scroll/lib/useScroll';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import routes from './routes';
import reducers from './reducers';
import { authenticate, locationChange } from './containers/App/actions';
import './styles/bootstrap.css';
import './styles/glyphicons.css';
import './styles/index.css';

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  applyMiddleware(thunk, routingMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => store.dispatch(locationChange(location)));

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
