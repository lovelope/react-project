import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 本地化
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN.js';

// 语法高亮
import 'prismjs/themes/prism.css';

import App from '@/App.tsx';
// @ts-ignore
import Store from './store/index.ts';

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}
