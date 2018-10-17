import webpack from 'webpack';
import path from 'path';

import paths, { PUBLIC_PATH } from './paths';
import getTheme from './theme';
import getStyleLoaders from './getStyleLoaders';

// 覆盖 antd 主题
const theme = getTheme(paths.appTheme);

const isProd = process.env.NODE_ENV === 'production';
const isVerbose = process.argv.includes('--verbose');

const REGEXP_SCRIPT = /\.(js|jsx|mjs)$/;
const REGEXP_IMAGE = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const REGEXP_MODULE_CSS = /\.module\.css$/;
const REGEXP_MODULE_LESS = /\.module\.less$/;
const REGEXP_CSS = /\.css$/;
const REGEXP_LESS = /\.less$/;

const OPEN_SOURCE_MAP = true;

export default {
  context: paths.appRoot,

  mode: isProd ? 'production' : 'development',

  entry: ['@babel/polyfill', paths.appIndexJs], // 入口

  // 产出
  output: {
    path: paths.appDist,
    publicPath: PUBLIC_PATH,
    pathinfo: isVerbose,
    // 入口文件名
    filename: isProd ? 'js/[name].js' : 'js/[name].[hash:8].js',
    // 非入口代码分块文件名规则
    chunkFilename: isProd ? 'js/[name].chunk.js' : '[name].[hash:8].chunk.js',
    // 格式化 windows 上的文件路径
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  devtool: isProd ? 'cheap-module-eval-source-map' : 'source-map',

  resolve: {
    alias: {
      '@': paths.appSrc,
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: REGEXP_SCRIPT,
        include: paths.appSrc,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true, // 缓存lint结果，可以减少lint时间
          },
        },
      },
      {
        // 只匹配第一个
        oneOf: [
          {
            test: REGEXP_IMAGE,
            loader: 'url-loader', // 图片
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
          {
            test: REGEXP_SCRIPT,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: !isProd, // 缓存
              },
            },
          },
          {
            test: REGEXP_MODULE_CSS,
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
            }),
          },
          {
            test: REGEXP_CSS,
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
            }),
          },
          {
            test: REGEXP_MODULE_LESS,
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              useLess: true,
              modifyVars: theme,
            }),
          },
          {
            test: REGEXP_LESS,
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              useLess: true,
              modifyVars: theme,
            }),
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader', // 其它文件
            options: {
              name: 'other/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // 优化 moment 包大小，去除本地化内容
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
