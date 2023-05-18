/* eslint-disable @typescript-eslint/no-var-requires -- we're using commonjs here */
/* eslint-disable unicorn/prefer-module -- not supported in eslint yet */

const {
  rules: airbnbStyleRules,
} = require('eslint-config-airbnb-base/rules/style');

/**
 * @type { import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    // prettier must be last
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'no-only-tests',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.spec.{ts,js}'],
      rules: {
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-useless-undefined': 'off', // usually we want to test `undefined` cases
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': 'warn',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          args: true,
        },
      },
    ],
    // import sorting
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    // rules are more annoying than helpful
    'unicorn/no-null': 'off',
    'unicorn/no-array-reduce': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-restricted-syntax': airbnbStyleRules['no-restricted-syntax'].filter(
      (item) => typeof item === 'string' || item.selector !== 'ForOfStatement'
    ),
    'unicorn/prefer-string-replace-all': 'off', // we prefer to allow older browsers/Node.js versions for now
  },
};
