/* eslint-disable no-param-reassign */
import { readdir } from 'node:fs/promises';
import { defineConfig } from 'tsup';

export default defineConfig(async () => {
  const functionNames = await readdir('src/functions', {
    withFileTypes: true,
  }).then((dirents) =>
    dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
  );
  return {
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
    sourcemap: true,
    splitting: false,
    platform: 'neutral',
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    tsconfig: 'tsconfig.build.json',
  };
});
