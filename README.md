# typedash

<a href="https://www.npmjs.com/package/typedash"><img src="https://img.shields.io/npm/v/typedash?color=blue" alt="npm link" target="_blank" />
</a>
<a href="https://www.npmjs.com/package/typedash" target="_blank"><img src="https://img.shields.io/npm/dm/typedash" alt="downloads" /></a>
<a href="https://bundlejs.com/?q=typedash" target="_blank"><img src="https://deno.bundlejs.com/?q=typedash&config={%22analysis%22:undefined}&badge=" /></a>
<img src="https://img.shields.io/npm/l/typedash" />
<a href="https://tsplay.dev/Woxbjw" target="_blank"><img src="https://img.shields.io/badge/%F0%9F%9A%80-playground-yellow" alt="playground" /></a>

A modern collection of utility functions for all occasions, all written in TypeScript and type-safe.

Similar to [lodash](https://lodash.com/) but with a focus on simplicity and type-safety (no excessive checks are made, [trust the compiler](https://slack.engineering/typescript-at-slack/)), tree-shaking, and leveraging the platform whenever possible.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Array](#array)
  - [Object](#object)
  - [String](#string)
  - [Type Guards](#type-guards)
  - [Function](#function)
  - [Math](#math)
  - [Utility](#utility)
- [License](#license)

## Features

- Modern and tree-shakeable
- Written in and designed to work with TypeScript (plain JavaScript also supported)
- Zero runtime dependencies
- Growing collection of 60+ type-safe utility functions

## Installation

```console
npm install typedash
# or using pnpm
pnpm add typedash
```

## Usage

Every function can be imported from the main entry point or individually for optimal tree-shaking:

```ts
import { pick, objectKeys } from "typedash";
import { pick } from "typedash/pick"; // individual import also works
```

typedash shines where TypeScript's built-in types fall short. For example, string casing functions return type-level transformed strings:

```ts
import { camelCase } from "typedash";

const key = camelCase("foo-bar-baz");
//    ^? "fooBarBaz" (not just string)
```

And object utilities preserve precise key and value types:

```ts
import { objectKeys, pick } from "typedash";

const obj = { a: 1, b: 2, c: 3 };

const keys = objectKeys(obj);
//    ^? ("a" | "b" | "c")[]

const subset = pick(obj, ["a", "b"]);
//    ^? { a: number, b: number }
```

## API

### Array

| Function             | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `castArray`          | Wraps value in an array if not already one                      |
| `castArrayIfDefined` | Like `castArray`, but returns `undefined` for `undefined` input |
| `chunk`              | Splits an array into chunks of a given size                     |
| `compact`            | Removes all falsey values from an array                         |
| `difference`         | Returns elements in the first array not in the second           |
| `intersection`       | Returns elements present in both arrays                         |
| `orderBy`            | Sorts an array of objects by one or more properties             |
| `partition`          | Splits an array into two groups based on a predicate            |
| `range`              | Creates an array of numbers in a given range                    |
| `sample`             | Returns a random element from an array                          |
| `shuffle`            | Returns a new array with elements randomly reordered            |
| `single`             | Returns the only element of an array, or throws                 |
| `take`               | Returns the first N elements of an array                        |
| `unique`             | Returns an array with duplicate elements removed                |
| `without`            | Returns a new array excluding specified values                  |
| `zip`                | Pairs elements from two arrays into tuples                      |

### Object

| Function            | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `get`               | Gets the value at a nested path of an object          |
| `groupBy`           | Groups array elements by a key function               |
| `hasKey`            | Checks if an object has a given key                   |
| `invert`            | Swaps the keys and values of an object                |
| `keyBy`             | Creates an object keyed by a property of each element |
| `mapKeys`           | Maps the keys of an object to new keys                |
| `mapValues`         | Maps the values of an object to new values            |
| `objectEntries`     | Typed version of `Object.entries`                     |
| `objectFromEntries` | Typed version of `Object.fromEntries`                 |
| `objectKeys`        | Typed version of `Object.keys`                        |
| `omit`              | Returns an object without the specified keys          |
| `pick`              | Returns an object with only the specified keys        |
| `set`               | Sets a value at a nested path of an object            |
| `toObject`          | Converts an array of strings into an object           |

### String

| Function       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `camelCase`    | Converts a string to `camelCase`                        |
| `capitalize`   | Capitalizes the first character of a string             |
| `constantCase` | Converts a string to `CONSTANT_CASE`                    |
| `ensurePrefix` | Prepends a prefix if the string doesn't already have it |
| `ensureSuffix` | Appends a suffix if the string doesn't already have it  |
| `kebabCase`    | Converts a string to `kebab-case`                       |
| `snakeCase`    | Converts a string to `snake_case`                       |
| `startCase`    | Converts a string to `Start Case`                       |

### Type Guards

| Function          | Description                                     |
| ----------------- | ----------------------------------------------- |
| `assert`          | Asserts a condition is true, throws if not      |
| `assertNever`     | Exhaustiveness check for unreachable code paths |
| `createTypeGuard` | Creates a reusable type guard function          |
| `isArray`         | Type guard for arrays                           |
| `isEmpty`         | Checks if a value is empty                      |
| `isEqual`         | Deep equality comparison                        |
| `isNonNullable`   | Type guard excluding `null` and `undefined`     |

### Function

| Function   | Description                                          |
| ---------- | ---------------------------------------------------- |
| `debounce` | Delays invocation until after a wait period          |
| `memoize`  | Caches the result of a function                      |
| `negate`   | Returns a function that negates the predicate result |
| `once`     | Restricts a function to a single invocation          |
| `throttle` | Limits how frequently a function can be called       |

### Math

| Function  | Description                             |
| --------- | --------------------------------------- |
| `clamp`   | Clamps a number within a range          |
| `count`   | Counts elements in an iterable          |
| `inRange` | Checks if a number falls within a range |
| `max`     | Returns the maximum value in an array   |
| `min`     | Returns the minimum value in an array   |
| `sum`     | Computes the sum of an array of numbers |

### Utility

| Function   | Description                                 |
| ---------- | ------------------------------------------- |
| `identity` | Returns the input value unchanged           |
| `join`     | Joins array elements with a typed separator |
| `noop`     | A no-op function                            |
| `pipe`     | Left-to-right function composition          |
| `uniqueId` | Generates a unique identifier string        |

## License

typedash is MIT licensed.
