import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 本地化
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

import App from '@/App';
import Store from './store';

hljs.registerLanguage('javascript', javascript);

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
