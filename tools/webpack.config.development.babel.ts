/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackConfigBase from './webpack.config.base.babel';
import paths, { PUBLIC_PATH } from './paths';
import proxyConfigAll from './proxy.config';
import getValueByEnv from './getValueByEnv';

const HOST = process.env.HOST || '0.0.0.0'; // 本机IP
const PORT = process.env.PORT || 8080; // 端口号

const proxyCurrent = getValueByEnv(proxyConfigAll, { defaultEnv: 'dev' });

const webpackConfigDev: webpack.Configuration = merge(webpackConfigBase, {
  devServer: {
    // 允许访问的机器列表
    allowedHosts: [HOST, 'localhost', '127.0.0.1'],

    // 客户端日志信息等级
    clientLogLevel: 'none',

    // gzip 压缩
    compress: true,

    // 提供静态资源的文件夹，可以使用数组，推荐使用 *绝对路径*
    contentBase: paths.appPublic,

    // 绕过主机检查，仅在需要其它机器连接时打开此选项
    disableHostCheck: false,

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

    // 服务目录，总是以`/`开头或结尾，与 `output.publicPath` 相同
    publicPath: PUBLIC_PATH,

    // 此选项允许浏览器使用本地 IP 打开。
    useLocalIp: true,
  } as webpackDevServer.Configuration,
  plugins: [
    // html 模板
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),

    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default webpackConfigDev;
