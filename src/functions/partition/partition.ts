import { Maybe } from '../../types';

export function partition<T, S extends T>(
  array: Maybe<readonly T[]>,
  predicate: (item: T) => item is S
): readonly [equals: S[], notEquals: Exclude<T, S>[]];
export function partition<T>(
  array: Maybe<readonly T[]>,
  predicate: (item: T) => boolean
): readonly [equals: T[], notEquals: T[]];
export function partition<T, S extends T>(
  array: Maybe<readonly T[]>,
  predicate: ((item: T) => item is S) | ((item: T) => boolean)
): readonly [S[], Exclude<T, S>[]] {
  if (array == null) {
    return [[], []];
  }

  const equals: S[] = [];
  const notEquals: Exclude<T, S>[] = [];

  for (const item of array) {
    if (predicate(item)) {
      equals.push(item);
    } else {
      notEquals.push(item as Exclude<T, S>);
    }
  }

  return [equals, notEquals];
}
