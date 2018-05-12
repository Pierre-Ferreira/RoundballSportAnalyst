import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.css';
import reducers from '../imports/reducers';
// import './index.css';
import AppContainer from '../imports/ui/containers/Layout/AppContainer';
import registerServiceWorker from './registerServiceWorker';


// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// const initialState = {}
const enhancers = [];
const middleware = [
  thunk,
  // Build the middleware for intercepting and dispatching navigation actions.
  routerMiddleware(history),
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composedEnhancers,
);

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('target'),
  );
  registerServiceWorker();
});




// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
//
// // add render routes function
// import { renderRoutes } from '../imports/startup/client/routes.jsx';
//
// Meteor.startup(() => {
//   render(renderRoutes(), document.getElementById('target'));
// });
