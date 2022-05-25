/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import webpackConfigBase from './webpack.config.base.babel';
import paths from './paths';
import proxyConfigAll from './proxy.config';
import getValueByEnv from './getValueByEnv';

const HOST = process.env.HOST || '127.0.0.1'; // 本机IP
const PORT = process.env.PORT || 8080; // 端口号

const proxyCurrent = getValueByEnv(proxyConfigAll, { defaultEnv: 'dev' });

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfigDev: Configuration = merge(webpackConfigBase, {
  devServer: {
    // 允许访问的机器列表
    allowedHosts: [HOST, 'localhost', '127.0.0.1'],

    // gzip 压缩
    compress: true,

    // html5路由
    historyApiFallback: true,

    // ip地址，`0.0.0.0` 支持 `localhost`、`127.0.0.1`、ip访问
    host: HOST,

    // 热模块替换
    hot: true,

    // 启动后打开浏览器
    open: true,

    // 服务端口号
    port: PORT,

    // api转发
    proxy: proxyCurrent,
  },
  plugins: [
    // html 模板
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),

    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
  ],
} as Configuration) as Configuration;

export default webpackConfigDev;
