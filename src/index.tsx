import React from 'react';
import ReactDOM from 'react-dom';

// 本地化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN.js';

import App from '@/App';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.querySelector<HTMLDivElement>('#root')
);
