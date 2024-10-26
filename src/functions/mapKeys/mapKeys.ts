import type { CastToString } from '../../types';
import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

/**
 * Returns a new object with the same values as the given object, but with each key mapped to a new key as returned by the given mapper function.
 * @param object The object to map the keys of.
 * @param mapperFunction The function to map the keys with.
 * @returns A new object with the mapped keys.
 */
export function mapKeys<T extends object, K extends PropertyKey>(
  object: T,
  mapperFunction: (
    key: CastToString<keyof T>,
    value: T[keyof T],
    object: T
  ) => K
): Record<K, T[keyof T]> {
  return objectFromEntries(
    objectEntries(object).map(([key, value]) => [
      mapperFunction(key, value, object),
      value,
    ])
  );
}
