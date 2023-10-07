import { CastToString, KeysOfUnion } from '../../types';
import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

/**
 * Returns a new object with the same keys as the given object, but with each value mapped to a new value as returned by the given mapper function.
 * @param object The object to map.
 * @param mapperFunction The function used to map each value.
 * @returns A new object with the same keys as the given object, but with each value mapped to a new value as returned by the given mapper function.
 * @example
 * ```ts
 * mapValues({ a: 1, b: 2, c: 3 }, (value) => value * 2) // { a: 2, b: 4, c: 6 }
 * ```
 */
export function mapValues<T extends object, V>(
  object: T,
  mapperFunction: (value: T[keyof T], key: CastToString<KeysOfUnion<T>>) => V
): Record<keyof T, V> {
  return objectFromEntries(
    objectEntries(object).map(([key, value]) => [
      key,
      mapperFunction(value, key),
    ])
  ) as Record<keyof T, V>;
}
