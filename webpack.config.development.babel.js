import { v4 } from 'internal-ip';

import webpackConfigBase from './webpack.config.base.babel';

const host = v4.sync(); // 本机IP

const webpackConfigDev = {
  ...webpackConfigBase,
  devServer: {
    contentBase: './dist', // 产出文件夹
    historyApiFallback: {
      // html5路由
      disableDotRule: true,
    },
    host, // ip地址
    allowedHosts: [
      // 允许地址访问列表
      host,
    ],
    hot: true, // 热模块替换
    open: true, // 打开浏览器
    proxy: {
      // api转发
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
    progress: true,
  },
};

export default webpackConfigDev;
