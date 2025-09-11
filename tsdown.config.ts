import { readdir } from 'node:fs/promises';
import { defineConfig, type UserConfig } from 'tsdown';

export default defineConfig(async () => {
  const functionNames = await readdir('src/functions', {
    withFileTypes: true,
  }).then((dirents) =>
    dirents
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => !dirent.name.startsWith('_')) // internal functions
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
    platform: 'neutral',
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    tsconfig: 'tsconfig.build.json',
  } satisfies UserConfig;
});
