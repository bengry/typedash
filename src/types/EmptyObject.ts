import type { EmptyObject as UnkeyedEmptyObject } from 'type-fest';

import type { IsEqual } from './IsEqual';

/**
 * Represents an empty object, either with or without properties.
 */
export type EmptyObject<T extends object = never> = IsEqual<
  T,
  never
> extends true
  ? UnkeyedEmptyObject
  : KeyedEmptyObject<T>;

/**
 * Represents an empty object with keys from another object.
 * @example
 * ```ts
 * type A = KeyedEmptyObject<{ a: string; b: number }>;
 * // type A = { a?: never; b?: never }
 * ```
 */
export type KeyedEmptyObject<T extends object> = { [K in keyof T]?: never };
