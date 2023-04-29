<a href="https://www.npmjs.com/package/typeswiss"><img src="https://img.shields.io/npm/v/typeswiss?color=blue" alt="npm link" />
</a>
<a href="https://www.npmjs.com/package/typeswiss"><img src="https://img.shields.io/npm/dm/typeswiss" alt="downloads" /></a>
<img src="https://img.shields.io/npm/l/typeswiss" />
<a href="https://tsplay.dev/w22Azw"><img src="https://img.shields.io/badge/%F0%9F%9A%80-playground-yellow" alt="playground" /></a>

# TypeSwiss

A modern swiss army knife library for utility functions, all written in TypeScript and type-safe.

Similar to [lodash](https://lodash.com/) but with a focus on type-safety, tree-shaking, and leveraging the platform whenever possible.

### Features

- 📦 Modern and tree-shakeable
- 🔥 Written in TypeScript
- 🔍 Provides type-safe utility functions
- 🤖 Designed to work seamlessly with TypeScript
- 🌱 Growing collection of utility functions
- 🛠️ Includes functions for common programming tasks
- 🧰 Helps simplify your code
- 🤝 Includes TypeScript type definitions
- 🐞 Bug reports and feature requests welcome
- 📝 MIT licensed

## Installation

You can install TypeSwiss using `npm` or `yarn`:

```console
npm install typeswiss
# or
yarn add typeswiss
```

## Usage

TypeSwiss provides a set of utility functions that can be imported and used in your TypeScript projects. Here’s an example of how to import and use the `pick` function:

```ts
import { pick } from 'typeswiss';

interface ExampleObj {
  a: number;
  b: number;
  c: number;
}
const obj: ExampleObj = {
  a: 1,
  b: 2,
  c: 3,
};
const result = pick(obj, ['a', 'b']); // { a: 1, b: 2 }
//     ^? Pick<ExampleObj, "a" | "b">
```

## Contributing

If you find a bug or have a feature request, please open an issue on the GitHub repository. Pull requests are also welcome!

### Developing

Watch and rebuild code with `tsup`:

```console
yarn dev
```

Run tests with `vitest` when changes are detected.

```console
yarn test:watch
```

## License

TypeSwiss is MIT licensed.

### Building

Build package with `tsup` for production.

```console
yarn build
```

### Linking

Often times you want to `link` the package you're developing to another project locally to test it out to circumvent the need to publish it to NPM.

For this we use [yalc](https://github.com/wclr/yalc) which is a tool for local package development and simulating the publishing and installation of packages.

In a project where you want to consume your package simply run:

```console
npx yalc link my-react-package
# or
yarn yalc add my-react-package
```

Learn more about `yalc` [here](https://github.com/wclr/yalc).

### Testing

To run all tests once without watching for changes.

```console
yarn test
```

To watch for changes and run tests.

```
yarn test:watch
```

### Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### Releasing, tagging & publishing to NPM

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM. Additionally, a Storybook will be published to Github pages.

Learn more about how to use the `release-it` command [here](https://github.com/release-it/release-it).

```console
yarn release
```

When you are ready to publish to NPM simply run the following command:

```console
yarn publish
```

#### Auto publish after Github Release

❗Important note: in order to publish package to NPM you must add your token as a Github Action secret. Learn more on how to configure your repository and publish packages through Github Actions [here](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages).
