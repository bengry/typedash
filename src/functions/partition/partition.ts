import { Maybe } from '../../types';

/**
 * Partitions an array into two arrays based on a predicate function.
 *
 * @param array The input array to partition.
 * @param predicate A function that takes an array item and returns a boolean indicating whether the item should be included in the "equals" array or the "notEquals" array.
 *
 * @returns A tuple containing two arrays: the "equals" array and the "notEquals" array.
 */
export function partition<T, S extends T>(
  array: Maybe<readonly T[]>,
  predicate: (item: T) => item is S
): readonly [equals: S[], notEquals: Exclude<T, S>[]];
/**
 * Partitions an array into two arrays based on a predicate function.
 *
 * @param array The input array to partition.
 * @param predicate A function that takes an array item and returns a boolean indicating whether the item should be included in the "equals" array or the "notEquals" array.
 * @returns A tuple containing two arrays: the "equals" array and the "notEquals" array.
 */
export function partition<T>(
  array: Maybe<readonly T[]>,
  predicate: (item: T) => boolean
): readonly [equals: T[], notEquals: T[]];
/**
 * Implementation of the partition function.
 */
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
