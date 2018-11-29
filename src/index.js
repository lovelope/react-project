import React from 'react';
import ReactDOM from 'react-dom';

// 本地化
// import { LocaleProvider } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import reducers from './reducer';

import App from '@/App';

hljs.registerLanguage('javascript', javascript);

// const composeEnhancers = compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<App />, document.getElementById('root'));
