import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import webpackConfigBase from './webpack.config.base.babel';
import paths from './paths';

// eslint-disable-next-line import/no-dynamic-require
const manifestJson = require(paths.appDistDllManifestJson);

const OPEN_SOURCE_MAP = true;
const isProd = process.env.NODE_ENV === 'production';

const webpackConfigProd = {
  ...webpackConfigBase,
  mode: 'production',
  output: {
    // 产出
    filename: 'js/[name].[hash:8].bundle.js', // 入口文件名
    chunkFilename: 'js/[name].[hash:8].chunk.js', // 非入口代码分块文件名规则
    path: paths.appDist,
  },
  devtool: OPEN_SOURCE_MAP ? 'source-map' : false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: OPEN_SOURCE_MAP,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    ...webpackConfigBase.plugins,

    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : '[id].css',
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new webpack.DllReferencePlugin({
      manifest: manifestJson,
    }),

    new HtmlIncludeAssetsPlugin({
      assets: ['dll/vendor.dll.js'], //  添加的资源相对html的路径
      append: false, // false 在其他资源的之前添加 true 在其他资源之后添加
    }),

    // 清理旧文件, plugins 顺序应该放在最后
    new CleanWebpackPlugin([paths.appDist], {
      root: paths.appRoot,
      exclude: ['dll'],
    }),
  ],
};

export default webpackConfigProd;
