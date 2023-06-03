import { Writable } from 'type-fest';

/**
 * Inverts the keys and values of an object.
 * @param object The object to invert.
 * @returns A new object with the keys and values inverted.
 *
 * If the object has duplicate values, the last key will be used.
 * @example
 * ```typescript
 * invert({
 *   a: 'x',
 *   b: 'y',
 *   c: 'z'
 * }); // { x: 'a', y: 'b', z: 'c' }
 * ```
 */
export function invert<
  /* const generic is used to make sure we capture the value as a string literal */ const T extends Record<
    PropertyKey,
    PropertyKey
  >
>(
  object: T
): // we run it through writeable to simplify the type and "remove" the effect of the const generic parameter.
Writable<Inverted<T>> {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [value, key])
  ) as Writable<Inverted<T>>;
}

type Inverted<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
