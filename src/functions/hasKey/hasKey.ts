import { KeysOfUnion, StringWithAutocomplete } from '../../types';

export function hasKey<
  T extends object,
  K extends StringWithAutocomplete<KeysOfUnion<T> & string> | PropertyKey
>(value: T, key: K): value is T & Record<K, unknown> {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  return key in value;
}
