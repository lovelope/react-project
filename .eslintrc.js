module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
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
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    '@typescript-eslint/indent': ['error', 2],
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

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'react/prefer-stateless-function': 'off',

    'prettier/prettier': 'error',
  },
};
