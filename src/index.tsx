import React from 'react';
import { createRoot } from 'react-dom/client';

// 本地化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN.js';

import App from '@/App';

const container = document.querySelector<HTMLDivElement>(
  '#root'
) as HTMLDivElement;
const root = createRoot(container);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
