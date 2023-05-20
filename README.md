# typedash

<a href="https://www.npmjs.com/package/typedash"><img src="https://img.shields.io/npm/v/typedash?color=blue" alt="npm link" target="_blank" />
</a>
<a href="https://www.npmjs.com/package/typedash" target="_blank"><img src="https://img.shields.io/npm/dm/typedash" alt="downloads" /></a>
<a href="https://bundlejs.com/?q=typedash" target="_blank"><img src="https://deno.bundlejs.com/?q=typedash&config={%22analysis%22:undefined}&badge=" /></a>
<img src="https://img.shields.io/npm/l/typedash" />
<a href="https://tsplay.dev/NB8v4W" target="_blank"><img src="https://img.shields.io/badge/%F0%9F%9A%80-playground-yellow" alt="playground" /></a>

A modern swiss army knife library for utility functions, all written in TypeScript and type-safe.

Similar to [lodash](https://lodash.com/) but with a focus on type-safety, tree-shaking, and leveraging the platform whenever possible.

<a href="https://tsplay.dev/WG8x9w" target="_blank">
<img src="https://raw.githubusercontent.com/bengry/typedash/main/docs/assets/readme-example.png" />
</a>

### Features

- 📦 Modern and tree-shakeable
- 🔥 Written in and designed to work with TypeScript (plain JavaScript also supported)
- 🚫 No runtime dependencies
- 🌱 Growing collection of 40+ type-safe utility functions

## Installation

You can install typedash using `npm` or `yarn`:

```console
npm install typedash
# or
yarn add typedash
```

## Usage

typedash provides a set of utility functions that can be imported and used in your TypeScript projects. Here’s an example of how to import and use the `pick` function:

```ts
import { objectKeys } from 'typedash';
import { pick } from 'typedash/pick'; // either syntax works

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

## License

typedash is MIT licensed.
