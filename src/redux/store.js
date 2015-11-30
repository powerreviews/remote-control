'use strict';

import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

export default function() {
  let reducer = combineReducers(reducers);
  let store = createStore(reducer);
  return store;
}
