import { createKnownTypeGuard } from '../createKnownTypeGuard';

/**
 * Returns a new array containing all elements of the input array except the specified items to exclude.
 * @param array The input array to exclude items from.
 * @param itemsToExclude An iterable of items to exclude from the input array.
 * @returns A new array containing all elements of the input array except the specified items to exclude.
 * @example
 * ```ts
 * without([1, 2, 3], [2, 3]) // [1]
 * without(['a', 'b', 'c'], ['b', 'c']) // ['a']
 * without([1, 2, 3], []) // [1, 2, 3]
 */
export function without<T, const S extends T>(
  array: readonly T[],
  itemsToExclude: Iterable<S>
): Exclude<T, S>[] {
  const isItemToExclude = createKnownTypeGuard(itemsToExclude);
  return array.filter((item): item is Exclude<T, S> => !isItemToExclude(item));
}
