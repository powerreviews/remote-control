import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import './styles/base.scss';
// redux
import { Provider } from 'react-redux'
import createStore from './redux/createStore';
import DevTools from './redux/devTools';

const store = createStore();

render(
  (
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  ),
  document.getElementById('app')
);
