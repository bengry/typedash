import { objectFromEntries } from '../objectFromEntries';

/**
 * Converts an array of strings to an object with the same values as keys and values.
 * @example
 * ```ts
 * toObject(['a', 'b']) // { a: 'a', b: 'b' }
 * ```
 */
export function toObject<T extends string>(array: readonly T[]) {
  return objectFromEntries(array.map((value) => [value, value]));
}
