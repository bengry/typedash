import { KeysOfUnion, Many, Maybe } from '../../types';
import { castArray } from '../castArray';
import { createKnownTypeGuard } from '../createKnownTypeGuard';
import { objectEntries } from '../objectEntries';

export function pick<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Pick<T, K> {
  if (object == null) {
    return {} as Pick<T, K>;
  }

  const isKnownProperty = createKnownTypeGuard(castArray(properties));

  return Object.fromEntries(
    objectEntries(object).filter(([key]) => isKnownProperty(key))
  ) as Pick<T, K>;
}
