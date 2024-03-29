/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Terser from 'terser';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackConfigBase from './webpack.config.base.babel';
import paths, { PUBLIC_PATH } from './paths';
import urls from './urls';
import getValueByEnv from './getValueByEnv';
import switchConfig from './switch.config';

const { USE_DLL, USE_PRIVATE_SOURCE_MAP_SERVER } = switchConfig;

const isProd = process.env.NODE_ENV === 'production';

// 是否使用私有 sourcemap 服务器
const PRIVATE_SOURCE_MAP_SERVER = getValueByEnv(urls, {
  field: 'PRIVATE_SOURCE_MAP_SERVER',
  defaultEnv: 'online',
});
const SOURCE_MAP_PUBLIC_PATH: string = USE_PRIVATE_SOURCE_MAP_SERVER
  ? (PRIVATE_SOURCE_MAP_SERVER as string)
  : PUBLIC_PATH;

let manifestJson = null;
if (USE_DLL) {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    manifestJson = require(paths.appDistDllManifestJson);
  } catch (error) {
    console.error('【构建失败】您开启了 DLL 功能，但我没有找到 dll 文件');
    console.info('请先执行\n\tnpm run build:dll\n以生成 dll 文件');
    process.exit(0);
  }
}

const webpackConfigProd: webpack.Configuration = merge(webpackConfigBase, {
  mode: 'production',

  // 使用 SourceMapDevToolPlugin 生成的 sourcemap
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {
            drop_debugger: true, // 删除 debugger
            drop_console: true, // 删除 console
          },
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
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
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : '[id].css',
      ignoreOrder: true,
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        processConditionalComments: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      },
    }),

    USE_DLL &&
      new webpack.DllReferencePlugin({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        manifest: manifestJson as any,
      }),

    USE_DLL &&
      new HtmlWebpackTagsPlugin({
        tags: ['dll/vendor.dll.js'], // 添加的资源相对html的路径
        append: false, // false 在其他资源的之前添加 true 在其他资源之后添加
      }),

    // 自定义 sourcemap 地址
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: SOURCE_MAP_PUBLIC_PATH,
    }),

    // 清理旧文件, plugins 顺序应该放在最后
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*'].concat(
        USE_DLL ? ['!dll', '!dll/**/*'] : []
      ),
    }),

    // public 静态资源文件拷贝，针对 js 文件做压缩
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: paths.appDist,
          async transform(content, filePath): Promise<string> {
            if (filePath.endsWith('.js')) {
              // 将 Buffer(content) 转为 String(source)
              const source = content.toString('utf8');
              const { code } = await Terser.minify(source);
              return code as string;
            }
            return content;
          },
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ].filter(Boolean),
});

export default webpackConfigProd;
