export const objectFromEntries: ObjectFromEntries = Object.fromEntries;

/**
 * Returns a new object from an iterable of key-value pairs.
 * Same as `Object.fromEntries()` but returns a typed object.
 * @param entries An iterable object that contains key-value entries.
 * @returns A new object from the given iterable of key-value pairs.
 * @example
 * ```ts
 * objectFromEntries([
 *   ['a', 1],
 *   ['b', 2],
 *   ['c', 3]
 * ]);
 * // { a: 1, b: 2, c: 3 }
 */
type ObjectFromEntries = <K extends PropertyKey, V>(
  entries: Iterable<readonly [K, V]>
) => Record<K, V>;
