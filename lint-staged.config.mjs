export default defineConfig({
  './{src,tests}/**/*.{ts,js,jsx,tsx}': [
    'eslint --ignore-path .gitignore --fix',
  ],
  '*': 'prettier --write',
});

/**
 * Helper function to get type checking and intellisense for the config.
 * @param {import('lint-staged').Config} config
 * @returns {import('lint-staged').Config}
 */
function defineConfig(config) {
  return config;
}
