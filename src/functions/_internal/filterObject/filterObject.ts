import { KeysOfUnion, Maybe } from '../../../types';

import { ObjectPredicate } from './createObjectPredicate';

export function filterObject<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
) {
  if (object == null) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) =>
      predicate(value, key as KeysOfUnion<T>, object)
    )
  );
}
