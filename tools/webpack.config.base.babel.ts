/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import os from 'os';

import webpack from 'webpack';
import HappyPack from 'happypack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import mdHighlightPlugin from '@mapbox/rehype-prism';

import paths, { PUBLIC_PATH } from './paths';
import getTheme from './theme';
import getStyleLoaders from './getStyleLoaders';
import switchConfig from './switch.config';

// 构造出共享进程池，进程池中包含cpu+1个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length + 1 });

const { OPEN_SOURCE_MAP } = switchConfig;
// 覆盖 antd 主题
const theme = getTheme(paths.appTheme);

const isProd = process.env.NODE_ENV === 'production';
const isVerbose = process.argv.includes('--verbose');

const REGEXP_SCRIPT = /\.(ts|tsx|js|jsx|mjs)$/;
const REGEXP_IMAGE = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const REGEXP_MODULE_CSS = /\.module\.css$/;
const REGEXP_MODULE_LESS = /\.module\.less$/;
const REGEXP_CSS = /\.css$/;
const REGEXP_LESS = /\.less$/;

/**
 *
 * @export {webpack.Configuration} default
 */
const config: webpack.Configuration = {
  context: paths.appRoot,

  mode: isProd ? 'production' : 'development',

  // 入口
  entry: [paths.appEntry],

  // 产出
  output: {
    // 所有输出文件的目标路径，*必须是绝对路径*
    path: paths.appDist,
    publicPath: PUBLIC_PATH,
    pathinfo: isVerbose,
    // 入口文件名
    filename: isProd ? 'js/[name].[hash:8].js' : 'js/[name].js',
    // 非入口代码分块文件名规则
    chunkFilename: isProd
      ? 'js/[name].[hash:8].chunk.js'
      : 'js/[name].chunk.js',
    // 格式化 windows 上的文件路径
    devtoolModuleFilenameTemplate: (
      info: webpack.DevtoolModuleFilenameTemplateInfo
    ): string => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

  resolve: {
    alias: {
      '@': paths.appSrc,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [paths.appNodeModules, paths.appSrc],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: REGEXP_SCRIPT,
        include: paths.appSrc,
        exclude: paths.appNodeModules,
        use: ['happypack/loader?id=eslint'],
      },
      {
        // 只匹配第一个
        oneOf: [
          {
            test: REGEXP_IMAGE, // 图片
            include: paths.appSrc,
            exclude: paths.appNodeModules,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: REGEXP_SCRIPT,
            include: paths.appSrc,
            exclude: paths.appNodeModules,
            use: ['happypack/loader?id=babel'],
          },
          {
            test: REGEXP_MODULE_CSS,
            include: paths.appSrc,
            exclude: paths.appNodeModules,
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
            }),
          },
          {
            test: REGEXP_CSS,
            include: [paths.appSrc, paths.appNodeModules],
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
            }),
          },
          {
            test: REGEXP_MODULE_LESS,
            include: paths.appSrc,
            exclude: paths.appNodeModules,
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
            include: [paths.appSrc, paths.appNodeModules],
            use: getStyleLoaders({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              useLess: true,
              modifyVars: theme,
            }),
          },
          {
            test: /.mdx?$/,
            use: [
              'babel-loader',
              {
                loader: '@mdx-js/loader',
                options: {
                  rehypePlugins: [mdHighlightPlugin],
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            include: paths.appSrc,
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

    // 构建进度条
    !process.env.CI && new ProgressBarPlugin(),

    // lodash 按需打包
    new LodashModuleReplacementPlugin({
      paths: true, // 解决 `get` 取值报错的问题
    }),

    new HappyPack({
      id: 'eslint',
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            cache: true, // 缓存lint结果，可以减少lint时间
          },
        },
      ],
    }),

    new HappyPack({
      id: 'babel',
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: !isProd, // 缓存
          },
        },
      ],
    }),
  ].filter(Boolean),

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  // 统计信息
  stats: {
    // 关闭 children 信息
    children: false,

    // 关闭构建模块信息
    modules: false,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: false,

    // 关闭 less 文件顺序警告
    warningsFilter: /mini-css-extract-plugin/,
  },

  performance: false,
};

export default config;
