import { Maybe } from '../../types';
import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

export function pickBy<T extends object>(
  object: Maybe<T>,
  predicate: <K extends keyof T>(value: T[K], key: K, object: T) => boolean
): Partial<T> {
  if (object == null) {
    return {};
  }

  return objectFromEntries(
    objectEntries(object).filter(([key, value]) =>
      predicate(value, key, object)
    )
  ) as Partial<T>;
}
