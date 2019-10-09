// store/configureStore.js

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

// Load middleware
let middleware = [
  // Analytics, // disable this temporary
  loggerMiddleware,
  thunk,
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware
  ];
}


// eslint-disable-next-line no-undef, no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const enhancer = composeEnhancers(
    applyMiddleware(
      ...middleware,
    )
  );
  const store = createStore(reducers, enhancer)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
