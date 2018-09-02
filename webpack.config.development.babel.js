import { v4 } from 'internal-ip';

import webpackConfigBase from './webpack.config.base.babel';
import paths from './paths';

const host = v4.sync(); // 本机IP
const PORT = 8080; // 端口号

const webpackConfigDev = {
  ...webpackConfigBase,
  devServer: {
    publicPath: `http://${host}:${PORT}/`, // 服务目录，总是以`/`开头或结尾
    contentBase: paths.appDist, // 产出文件夹
    historyApiFallback: true, // html5路由
    host, // ip地址
    allowedHosts: [
      // 允许地址访问列表
      host,
    ],
    hot: true, // 热模块替换
    open: true, // 打开浏览器
    clientLogLevel: 'warning', // 客户端日志信息等级
    proxy: {
      // api转发
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};

export default webpackConfigDev;
