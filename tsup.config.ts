/* eslint-disable no-param-reassign */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  treeshake: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig.build.json',
});
