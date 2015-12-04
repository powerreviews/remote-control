'use strict';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import {createDevTools, persistState} from 'redux-devtools';
import DevTools from './DevTools';

const finalCreateStore = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function() {
  let reducerCombo = combineReducers(reducers);
  let createStoreWithMiddleware = applyMiddleware(thunk)(finalCreateStore);
  let store = createStoreWithMiddleware(reducerCombo);
  return store;
}
