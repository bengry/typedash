# TypeSwiss

<a href="https://www.npmjs.com/package/typeswiss"><img src="https://img.shields.io/npm/v/typeswiss?color=blue" alt="npm link" target="_blank" />
</a>
<a href="https://www.npmjs.com/package/typeswiss" target="_blank"><img src="https://img.shields.io/npm/dm/typeswiss" alt="downloads" /></a>
<a href="https://bundlejs.com/?q=typeswiss" target="_blank"><img src="https://deno.bundlejs.com/?q=typeswiss&config={%22analysis%22:undefined}&badge=" /></a>
<img src="https://img.shields.io/npm/l/typeswiss" />
<a href="https://tsplay.dev/NB8v4W" target="_blank"><img src="https://img.shields.io/badge/%F0%9F%9A%80-playground-yellow" alt="playground" /></a>

A modern swiss army knife library for utility functions, all written in TypeScript and type-safe.

Similar to [lodash](https://lodash.com/) but with a focus on type-safety, tree-shaking, and leveraging the platform whenever possible.

<a href="https://tsplay.dev/WG8x9w" target="_blank">
<img src="https://raw.githubusercontent.com/bengry/typeswiss/main/docs/assets/readme-example.png" />
</a>

### Features

- 📦 Modern and tree-shakeable
- 🔥 Written in and designed to work with TypeScript (plain JavaScript also supported)
- 🚫 No runtime dependencies
- 🔍 Provides type-safe utility functions
- 🌱 Growing collection of 40+ utility functions

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
import { objectKeys } from 'typeswiss';
import { pick } from 'typeswiss/pick'; // either syntax works

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
const result = objectKeys(obj); // ["a", "b", "c"]
//     ^? ("a" | "b" | "c")[]

const result2 = pick(obj, ['a', 'b']); // { a: 1, b: 2 }
//     ^? Pick<ExampleObj, "a" | "b">
```

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

### Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### Releasing, tagging & publishing to NPM

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM.

```console
yarn release
```
