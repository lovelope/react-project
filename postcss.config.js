// plugin的 {key: value} 对应 { pluginName: pluginOptions }，postcss会自动查找插件

module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: false,
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
    cssnano: {},
  },
});
