import type { Get } from 'type-fest';

import { Many, ObjectPath } from '../../types';
import { hasKey } from '../hasKey';
import { isArray } from '../isArray';

/**
 * Gets the value at path of object.
 *
 * Allows accessing properties in unions of objects and getting undefined if the property is not present.
 */
export function get<T, Path extends ObjectPath<T>>(
  object: T,
  path: Path
): Get<T, Path>;
export function get<T, Path extends Many<string>>(
  object: T,
  path: Path
): Get<T, Path>;
export function get<T, Path extends ObjectPath<T> | Many<string>>(
  object: T,
  path: Path
): Get<T, Path> {
  const keys: readonly string[] = isArray(path) ? path : path.split('.');

  return keys.reduce<unknown>((value, key) => {
    if (hasKey(value as object, key)) {
      return (value as Record<typeof key, unknown>)[key];
    }

    // eslint-disable-next-line unicorn/no-useless-undefined -- default value, explicitly declare it
    return undefined;
  }, object as object) as Get<T, Path>;
}
