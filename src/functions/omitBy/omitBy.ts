import { KeysOfUnion, Maybe, PropertyValueOfUnion } from '../../types';
import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

export function omitBy<T extends object>(
  object: Maybe<T>,
  predicate: (
    value: Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
    key: KeysOfUnion<T>,
    object: T
  ) => boolean
): Partial<T> {
  if (object == null) {
    return {};
  }

  return objectFromEntries(
    objectEntries(object).filter(
      ([key, value]) =>
        !predicate(
          // this is fine, `undefined` is the technical result of a key not existing on another union member.
          // i.e. if we'd access `obj[key]` and `key` is not a key of `obj`, we'd get `undefined`.
          // this is not the case while looping over an object, so we're fine and can safely cast.
          value as Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
          key as KeysOfUnion<T>,
          object
        )
    )
  ) as Partial<T>;
}
