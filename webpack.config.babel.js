import { resolve } from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { v4 } from 'internal-ip';

const host = v4.sync(); // 本机IP

export default {
  mode: 'development',
  entry: './src/index.js', // 入口
  output: {
    // 产出
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清理旧文件
    new HtmlWebpackPlugin({
      // html模板
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // 模块热替换
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
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
