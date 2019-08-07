import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 本地化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN.js';

import App from '@/App.tsx';
// @ts-ignore
import Store from './store/index.ts';

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}
