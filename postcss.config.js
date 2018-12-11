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
    cssnano: {
      preset: [
        'advanced',
        {
          // 默认不移除许可证，这里移除所有
          discardComments: { removeAll: true },
          // 移除重复选择器或规则
          discardDuplicates: true,
          // 避免重新计算 zindex
          zindex: false,
        },
      ],
    },
  },
});
