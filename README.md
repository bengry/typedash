# typedash

<a href="https://www.npmjs.com/package/typedash"><img src="https://img.shields.io/npm/v/typedash?color=blue" alt="npm link" target="_blank" />
</a>
<a href="https://www.npmjs.com/package/typedash" target="_blank"><img src="https://img.shields.io/npm/dm/typedash" alt="downloads" /></a>
<a href="https://bundlejs.com/?q=typedash" target="_blank"><img src="https://deno.bundlejs.com/?q=typedash&config={%22analysis%22:undefined}&badge=" /></a>
<img src="https://img.shields.io/npm/l/typedash" />
<a href="https://tsplay.dev/NB8v4W" target="_blank"><img src="https://img.shields.io/badge/%F0%9F%9A%80-playground-yellow" alt="playground" /></a>

A modern collection of utility functions for all occasions, all written in TypeScript and type-safe.

Similar to [lodash](https://lodash.com/) but with a focus on simplicity and type-safety (no excessive checks are made, [trust the compiler](https://slack.engineering/typescript-at-slack/)), tree-shaking, and leveraging the platform whenever possible.

### Features

- 📦 Modern and tree-shakeable
- 🔥 Written in and designed to work with TypeScript (plain JavaScript also supported)
- 🚫 No runtime dependencies
- 🌱 Growing collection of 40+ type-safe utility functions

## Installation

```console
npm install typedash
# or using yarn
yarn add typedash
```

## Usage

typedash provides a set of utility functions that can be imported and used in your TypeScript projects. Here’s an example of how to import and use the `pick` function:

```ts
import { objectKeys } from 'typedash';
import { pick } from 'typedash/pick'; // either syntax works

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const result = objectKeys(obj); // ["a", "b", "c"]
//     ^? ("a" | "b" | "c")[]

const result2 = pick(obj, ['a', 'b']); // { a: 1, b: 2 }
//     ^? { a: number, b: number }
```

## License

typedash is MIT licensed.
