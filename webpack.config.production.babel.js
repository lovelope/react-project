import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpackConfigBase from './webpack.config.base.babel';
import paths from './paths';

const IS_USE_SOURCE_MAP = true;

const webpackConfigProd = {
  ...webpackConfigBase,
  mode: 'production',
  output: {
    // 产出
    filename: 'js/[name].[hash:8].bundle.js', // 入口文件名
    chunkFilename: 'js/[name].[hash:8].chunk.js', // 非入口代码分块文件名规则
    path: paths.appDist,
  },
  devtool: IS_USE_SOURCE_MAP ? 'source-map' : false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: IS_USE_SOURCE_MAP,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};

const htmlWebpackPlugin = new HtmlWebpackPlugin({
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
});

webpackConfigProd.plugins.forEach((plugin, index) => {
  if (plugin.constructor.toString().includes('HtmlWebpackPlugin')) {
    webpackConfigProd.plugins[index] = htmlWebpackPlugin;
  }
});

export default webpackConfigProd;
