import React from 'react';
import ReactDOM from 'react-dom';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
import { StoreProvider } from 'redux-react-hook';
import App from '@/App';

hljs.registerLanguage('javascript', javascript);

const composeEnhancers = compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
console.info(store);
ReactDOM.render(
  <StoreProvider value={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
