import { Maybe } from '../../types';

/**
 * Takes an array and returns an object with the keys of the array
 * mapped to the items of the array
 */
export function groupBy<T, K extends string>(
  array: Maybe<readonly T[]>,
  getter: (item: T) => K
) {
  return (array ?? []).reduce((draftGroups, currentItem) => {
    const key = getter(currentItem);

    // eslint-disable-next-line no-param-reassign
    draftGroups[key] ??= [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    draftGroups[key]!.push(currentItem);

    return draftGroups;
  }, {} as Partial<Record<K, T[]>>);
}
