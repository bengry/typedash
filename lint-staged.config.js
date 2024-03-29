// @ts-check

/**
 * @type { import('lint-staged').Config }
 */
export default {
  './src/**/*.{ts,js}': ['eslint --ignore-path .gitignore --fix'],
  '*': 'prettier --write',
};
