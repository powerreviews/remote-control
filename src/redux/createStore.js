'use strict';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function() {
  let reducerCombo = combineReducers(reducers);
  let createStoreWithMiddleware = applyMiddleware(thunk)(finalCreateStore);
  let store = createStoreWithMiddleware(reducerCombo);
  return store;
}
