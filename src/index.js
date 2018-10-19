import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 本地化
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import App from '@/App';
import Store from './store';

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
