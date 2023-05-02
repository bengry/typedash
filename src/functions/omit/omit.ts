import { KeysOfUnion, Many, Maybe, PropertyValueOfUnion } from '../../types';
import { castArray } from '../castArray';
import { createKnownTypeGuard } from '../createKnownTypeGuard';
import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Omit<T, K>;
export function omit<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
): Partial<T>;
export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: T, propertiesOrPredicate: Many<K> | ObjectPredicate<T>) {
  if (object == null) {
    return {} as Omit<T, K>;
  }

  const predicate: ObjectPredicate<T> =
    typeof propertiesOrPredicate === 'function'
      ? propertiesOrPredicate
      : createPropertiesPredicate(propertiesOrPredicate);

  return objectFromEntries(
    objectEntries(object).filter(([key, value]) => {
      const shouldOmit = predicate(
        // this is fine, `undefined` is the technical result of a key not existing on another union member.
        // i.e. if we'd access `obj[key]` and `key` is not a key of `obj`, we'd get `undefined`.
        // this is not the case while looping over an object, so we're fine and can safely cast.
        value as Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
        key as KeysOfUnion<T>,
        object
      );

      return !shouldOmit;
    })
  );
}

function createPropertiesPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(properties: Many<K>): ObjectPredicate<T> {
  const isKnownProperty = createKnownTypeGuard(castArray(properties));

  return (_value, key) => isKnownProperty(key);
}

type ObjectPredicate<T extends object> = (
  value: Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
  key: KeysOfUnion<T>,
  object: T
) => boolean;
