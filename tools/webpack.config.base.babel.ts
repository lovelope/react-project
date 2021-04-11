/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import mdHighlightPlugin from '@mapbox/rehype-prism';

import paths, { PUBLIC_PATH } from './paths';
import getTheme from './theme';
import getStyleLoaders from './getStyleLoaders';
import switchConfig from './switch.config';

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
    filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
    // 非入口代码分块文件名规则
    chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
  },

  devtool: !isProd && 'eval-source-map',

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
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: !isProd, // 缓存
                },
              },
            ],
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
    // 无需对现有代码做任何修改直接替换 Moment 成 Day.js
    new AntdDayjsWebpackPlugin(),

    // 优化 moment 包大小，去除本地化内容
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    // lodash 按需打包
    new LodashModuleReplacementPlugin({
      paths: true, // 解决 `get` 取值报错的问题
    }),

    new ESLintWebpackPlugin(),
  ].filter(Boolean),

  // 统计信息
  stats: {
    // 关闭 children 信息
    children: false,

    // 关闭构建模块信息
    modules: false,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: false,
  },

  performance: false,
};

export default config;
