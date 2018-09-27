import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

import paths, { DIST, PUBLIC_PATH } from './paths';
// import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';
const isVerbose = process.argv.includes('--verbose');

// const reScript = /\.(js|jsx|mjs)$/;
// const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
// const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const IS_USE_SOURCE_MAP = true;

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

  devtool: isProd ? 'cheap-module-inline-source-map' : 'source-map',

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
        test: /\.(js|jsx)$/,
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
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader', // 图片
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 缓存
              },
            },
          },
          {
            test: /\.css$/,
            use: isProd
              ? [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { importLoaders: 1, sourceMap: IS_USE_SOURCE_MAP }, // 前置loader数量1，postcss-loader
                  },
                  'postcss-loader',
                ]
              : ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/,
            use: isProd
              ? [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { importLoaders: 2, sourceMap: IS_USE_SOURCE_MAP }, // 前置loader数量2， less-loader + postcss-loader
                  },
                  'postcss-loader',
                  'less-loader',
                ]
              : ['style-loader', 'css-loader', 'less-loader'],
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
    new CleanWebpackPlugin([DIST]), // 清理旧文件
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.HotModuleReplacementPlugin(), // 模块热替换
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : '[id].css',
    }),
  ],
};
