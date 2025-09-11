import { defineConfig } from 'taze'

export default defineConfig({
  // Write to package.json automatically
  write: true,
  // Install after updating
  install: true,
  // Include both dependencies and devDependencies
  include: ['dependencies', 'devDependencies'],
  // Exclude specific packages if needed
  exclude: [],
  // For minor/patch mode: only update minor and patch versions
  mode: 'minor',
})