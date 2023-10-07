// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const {
  rules: airbnbStyleRules,
} = require('eslint-config-airbnb-base/rules/style');

/**
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
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended-typescript-error',
    // prettier must be last
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'no-only-tests',
    'prettier',
  ],
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // not supported in eslint yet
        'unicorn/prefer-module': 'off', // not supported in eslint yet
      },
    },
    {
      files: ['**/*.spec.{ts,js}'],
      rules: {
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-useless-undefined': 'off', // usually we want to test `undefined` cases
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      files: ['**/_internal/**/*.{ts,js}'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
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
          func: true,
          Func: true,
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    'no-restricted-syntax': airbnbStyleRules['no-restricted-syntax'].filter(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (item) => typeof item === 'string' || item.selector !== 'ForOfStatement'
    ),
    'unicorn/prefer-string-replace-all': 'off', // we prefer to allow older browsers/Node.js versions for now
    radix: 'off',
    'jsdoc/require-jsdoc': [
      'error',
      {
        enableFixer: false,
        publicOnly: true,
      },
    ],
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['note'],
      },
    ],
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
  },
};
