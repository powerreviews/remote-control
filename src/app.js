import { render } from 'react-dom';
import React from 'react';
import './styles/base.scss';
// redux
import createStore from './redux/createStore';
// components
import Root from './components/Root'

const store = createStore();

render(
  <Root store={store} />,
  document.getElementById('app')
);
