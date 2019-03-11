module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    // eslint-plugin-import@2.16.0 尚未支持`@typescript-eslint`
    // 'plugin:import/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true, // 全局严格模式
      jsx: true,
    },
    project: 'tsconfig.json',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    // indent: 'off',
    // '@typescript-eslint/indent': ['error', 2],

    '@typescript-eslint/camelcase': [
      'error',
      {
        allow: [
          '^UNSAFE_',
          'child_process',
          'drop_debugger',
          'drop_console',
          'keep_classnames',
          'keep_fnames',
        ],
      },
    ],

    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'react/prefer-stateless-function': 'off',

    // 使用 TS 无需使用 prop-types
    'react/prop-types': 'off',

    'prettier/prettier': 'error',
  },
};
