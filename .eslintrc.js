/* eslint-disable unicorn/prefer-module -- not supported in eslint yet */

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
  plugins: ['@typescript-eslint', 'no-only-tests', 'prettier'],
  overrides: [
    {
      files: ['**/*.spec.{ts,js}'],
      rules: {
        'unicorn/consistent-function-scoping': 'off',
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
    'unicorn/no-null': 'off',
    'unicorn/no-array-reduce': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
