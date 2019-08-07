// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * 获取 cssLoaders
 * @param {object} options 配置
 * @param {boolean} options.isProd 是否为生产环境
 * @param {boolean} options.sourceMap 是否开启sourceMap
 * @param {boolean} options.modules 是否开启css modules
 * @param {boolean} options.useLess 是否使用 less
 * @param {object} options.modifyVars 覆盖 less 变量
 * @returns {object[]} loader数组
 */
export default function getStyleLoaders({
  isProd = true, // 生产环境
  sourceMap = true, // 打开 sourceMap
  modules = false, // 开启 css module
  useLess = false, // 使用 less
  modifyVars = {}, // 修改 less 变量
}) {
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
        javascriptEnabled: true,
        modifyVars,
        sourceMap,
      },
    },
  ].filter(Boolean);
}
