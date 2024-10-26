// @ts-check

/**
 * @type { import('lint-staged').Config }
 */
export default {
  './src/**/*.{ts,js}': 'yarn lint:linter:fix',
  '*': 'yarn lint:format:fix',
};
