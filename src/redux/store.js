'use strict';

import { createStore, combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

export default function() {
  let store = createStore(tokenReducer);
  return store;
}
