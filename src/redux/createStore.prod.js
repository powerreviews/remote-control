'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

export default function() {
  let reducerCombo = combineReducers(reducers);
  let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  let store = createStoreWithMiddleware(reducerCombo);
  return store;
}
