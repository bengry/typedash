## Contributing

If you find a bug or have a feature request, please open an issue on the GitHub repository. Pull requests are also welcome!

### Developing

Watch and rebuild code with `tsup`:

```console
yarn dev
```

Run tests with `vitest`:

```console
yarn test
# or watch for changes
yarn test:watch
```

### Committing

When you are ready to commit, run the following command to get a formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### Building

Build package with `tsup` for production.

```console
yarn build
```

### Releasing, tagging & publishing to NPM

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM.

```console
yarn release
```
