import { KeysOfUnion, Many, Maybe } from '../../types';
import { castArray } from '../castArray';
import { createKnownTypeGuard } from '../createKnownTypeGuard';
import { objectEntries } from '../objectEntries';

export function pick<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Pick<T, K>;
export function pick<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
): Partial<T>;
export function pick<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, propertiesOrPredicate: Many<K> | ObjectPredicate<T>) {
  if (object == null) {
    return {} as Pick<T, K>;
  }

  const predicate: ObjectPredicate<T> =
    typeof propertiesOrPredicate === 'function'
      ? propertiesOrPredicate
      : createPropertiesPredicate(propertiesOrPredicate);

  return Object.fromEntries(
    objectEntries(object).filter(([key, value]) =>
      predicate(value, key, object)
    )
  );
}

function createPropertiesPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(properties: Many<K>): ObjectPredicate<T> {
  const isKnownProperty = createKnownTypeGuard(castArray(properties));

  return (_value, key) => isKnownProperty(key);
}

type ObjectPredicate<T extends object> = <K extends keyof T>(
  value: T[K],
  key: K,
  object: T
) => boolean;
