import { readdir } from 'node:fs/promises';
import { defineConfig } from 'vite-plus';

const functionNames = await readdir('src/functions', {
  withFileTypes: true,
}).then((dirents) =>
  dirents
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => !dirent.name.startsWith('_'))
    .map((dirent) => dirent.name)
);

export default defineConfig({
  pack: {
    entry: {
      index: './src/index.ts',
      ...Object.fromEntries(
        functionNames.map((functionName) => [
          `${functionName}/index`,
          `./src/functions/${functionName}/index.ts`,
        ])
      ),
    },
    treeshake: true,
    minify: true,
    sourcemap: true,
    platform: 'neutral',
    clean: true,
    dts: true,
    format: ['esm'],
    hash: false,
    tsconfig: 'tsconfig.build.json',
  },

  lint: {
    ignorePatterns: ['dist/**', 'coverage/**', '.omc/**', '.claude/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc'],
    rules: {
      'no-console': 'warn',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
    },
    overrides: [
      {
        files: ['**/*.spec.ts', '**/*.spec.js'],
        rules: {
          'no-empty': 'off',
          'no-empty-function': 'off',
        },
      },
    ],
  },

  fmt: {
    singleQuote: true,
    trailingComma: 'es5',
    semi: true,
    arrowParens: 'always',
    bracketSpacing: true,
    bracketSameLine: false,
    printWidth: 80,
    ignorePatterns: [
      'dist/**',
      'coverage/**',
      '.omc/**',
      '.claude/**',
      '**/pnpm-lock.yaml',
      '**/*.snap',
      '**/.npmrc',
      '**/.husky',
      '**/.gitignore',
      '**/.editorconfig',
      '**/.nvmrc',
      'docs/assets/**',
    ],
  },

  test: {},

  staged: {
    'src/**/*.{js,ts}': 'vp lint --fix',
    '**/*.{js,ts,json,md,yaml,yml}': 'vp fmt --write',
    '**/*.{ts,tsx}': 'ls-lint',
  },
});
