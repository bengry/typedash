import { KeysOfUnion, Maybe, PropertyValueOfUnion } from '../../../types';
import { objectEntries } from '../../objectEntries';

import { ObjectPredicate } from './createObjectPredicate';

export function filterObject<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
) {
  if (object == null) {
    return {};
  }

  return Object.fromEntries(
    objectEntries(object).filter(([key, value]) =>
      predicate(
        value as Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
        key,
        object
      )
    )
  );
}
