import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';
import reducers from '../reducers';
import reduxThunk from 'redux-thunk';

/**
 * When we call this function we return a created store with our reducers, so this is the same
 * as calling `const store = createStore(reducer)`. We have extracted it to a separate file. This function
 * gets called in 'index.js'. The second argument to 'createStore' is so we can use Redux DevTools
 * in our browser for easier debugging. Super cool!
 * @param {Object} initialState
 */

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const middlewareList = [reduxThunk, logger];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewareList)
);



export default function Store() {
  return createStore(reducers, enhancer);
}