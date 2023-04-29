import { createKnownTypeGuard } from '../createKnownTypeGuard';

/**
 * Gets the difference between two arrays.
 */
export function without<T, const S extends T>(
  array: readonly T[],
  itemsToExclude: Iterable<S>
): Exclude<T, S>[] {
  const isItemToExclude = createKnownTypeGuard(itemsToExclude);
  return array.filter((item): item is Exclude<T, S> => !isItemToExclude(item));
}
