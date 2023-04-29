/**
 * Same as Lodash's `keyBy` by more type-safe.
 */
export function keyBy<T, K extends string>(
  array: readonly T[],
  keyGetter: (item: T) => K
): Partial<Record<K, T>> {
  return array.reduce((draftObject, currentItem) => {
    const key = keyGetter(currentItem);

    // eslint-disable-next-line no-param-reassign
    draftObject[key] = currentItem;

    return draftObject;
  }, {} as Partial<Record<K, T>>);
}
