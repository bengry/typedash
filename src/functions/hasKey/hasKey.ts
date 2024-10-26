import type { KeysOfUnion, StringWithAutocomplete } from '../../types';

/**
 * Returns whether the input value has the specified key.
 * @param value The value to check.
 * @param key The key to check for.
 * @returns Whether the input value has the specified key.
 * @example
 * ```ts
 * hasKey({ a: 1 }, 'a') // true
 * hasKey({ a: 1 }, 'b') // false
 * ```
 */
export function hasKey<
  T extends object,
  K extends StringWithAutocomplete<KeysOfUnion<T> & string> | PropertyKey,
>(value: T, key: K): value is T & Record<K, unknown> {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  return key in value;
}
