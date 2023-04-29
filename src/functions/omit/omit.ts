import { Many, Maybe, KeysOfUnion } from '../../types';
import { castArray } from '../castArray';
import { createKnownTypeGuard } from '../createKnownTypeGuard';
import { objectEntries } from '../objectEntries';

export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Omit<T, K> {
  if (object == null) {
    return {} as Omit<T, K>;
  }

  const isKnownProperty = createKnownTypeGuard(castArray(properties));

  return Object.fromEntries(
    objectEntries(object).filter(([key]) => !isKnownProperty(key))
  ) as Omit<T, K>;
}
