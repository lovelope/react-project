const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },

  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ],
  plugins: ['eslint-plugin-react-hooks', 'eslint-plugin-prettier'],

  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },

  settings: {
    'import/extensions': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },

  rules: {
    'no-console': [ERROR, { allow: ['error', 'warn', 'info'] }],

    'jsx-a11y/anchor-is-valid': [
      ERROR,
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    // with some error here
    // 'import/extensions': [
    //   ERROR,
    //   'always',
    //   {
    //     ignorePackages: true,
    //     pattern: { ts: 'never', tsx: 'never', 'd.ts': 'never' },
    //   },
    // ],

    'prettier/prettier': ERROR,
  },

  overrides: [
    {
      files: ['**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        // type reference
        'spaced-comment': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        project: 'tsconfig.eslint.json',

        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'eslint-config-prettier',
        'eslint-config-prettier/@typescript-eslint',
      ],
      plugins: [
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-import/config/typescript',
        'eslint-plugin-prettier',
      ],

      rules: {
        'default-case': OFF,
        'no-dupe-class-members': OFF,

        'no-array-constructor': OFF,
        '@typescript-eslint/no-array-constructor': WARN,
        '@typescript-eslint/no-namespace': ERROR,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-unused-vars': [
          WARN,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': OFF,
        '@typescript-eslint/no-useless-constructor': WARN,
      },
    },
  ],
};
