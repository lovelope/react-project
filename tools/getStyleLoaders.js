// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * 获取 cssLoaders
 * @param {*} param0
 */
export default function getStyleLoaders({
  isProd = true, // 生产环境
  sourceMap = true, // 打开 sourceMap
  modules = false, // 开启 css module
  useLess = false, // 使用 less
  modifyVars = {}, // 修改 less 变量
}) {
  const prodLoaders = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap,

        modules,

        // 生产环境使用短类名
        localIdentName: '[local]--[hash:base64:8]',

        // 移除 css 注释
        discardComments: { removeAll: true },

        // 前置loader数量1，postcss-loader
        importLoaders: useLess ? 2 : 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap },
    },
  ].concat(
    !useLess
      ? []
      : [
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars,
              sourceMap,
            },
          },
        ]
  );

  const devLoaders = [
    {
      loader: 'style-loader',
      options: { sourceMap },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap,

        modules,

        // 开发环境使用详细类名
        localIdentName: '[path][name]__[local]--[hash:base64:5]',

        // 前置loader数量1，postcss-loader
        importLoaders: useLess ? 1 : 0,
      },
    },
  ].concat(
    !useLess
      ? []
      : [
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars,
              sourceMap,
            },
          },
        ]
  );

  if (isProd) {
    return prodLoaders;
  }
  return devLoaders;
}
