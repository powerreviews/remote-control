'use strict';

import { createStore, compose, combineReducers } from 'redux';
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
  let store = finalCreateStore(reducerCombo);
  return store;
}
