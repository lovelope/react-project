/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * 获取 cssLoaders 配置
 * @interface GetStyleLoadersOptions
 */
interface GetStyleLoadersOptions {
  /**
   * 是否为生产环境
   * @type {boolean}
   * @memberof GetStyleLoadersOptions
   */
  isProd?: boolean;

  /**
   * 是否开启sourceMap
   * @type {boolean}
   * @memberof GetStyleLoadersOptions
   */
  sourceMap?: boolean;

  /**
   * 是否开启css modules
   * @type {boolean}
   * @memberof GetStyleLoadersOptions
   */
  modules?: boolean;

  /**
   * 是否使用 less
   * @type {boolean}
   * @memberof GetStyleLoadersOptions
   */
  useLess?: boolean;

  /**
   * 覆盖 less 变量
   * @type {object}
   * @memberof GetStyleLoadersOptions
   */
  modifyVars?: {};
}

export default function getStyleLoaders({
  isProd = true, // 生产环境
  sourceMap = true, // 打开 sourceMap
  modules = false, // 开启 css module
  useLess = false, // 使用 less
  modifyVars = {}, // 修改 less 变量
}: GetStyleLoadersOptions): webpack.RuleSetUseItem[] {
  return [
    isProd
      ? MiniCssExtractPlugin.loader
      : {
          loader: 'style-loader',
          // the `sourceMap` option was removed.
          // The loader automatically inject source maps if the previous loader emit them
        },

    {
      loader: 'css-loader',
      options: {
        sourceMap,

        modules: modules
          ? {
              // 生产环境使用短类名，开发环境使用详细类名
              localIdentName: isProd
                ? '[local]--[hash:base64:8]'
                : '[path][name]__[local]--[hash:base64:5]',
            }
          : false,

        // 前置loader数量1，postcss-loader
        importLoaders: useLess ? 2 : 1,
      },
    },

    isProd && {
      loader: 'postcss-loader',
      options: { sourceMap },
    },
    useLess && {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars,
          sourceMap,
        },
      },
    },
  ].filter(Boolean);
}
