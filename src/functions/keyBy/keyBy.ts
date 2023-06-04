/**
 * Creates an object composed of keys generated from the results of running each element of `array` through `keyGetter`.
 * The corresponding value of each key is the last element responsible for generating the key.
 * @param array The array to iterate over.
 * @param keyGetter The function used to extract the key from each element.
 * @returns An object with the keys mapped to the elements.
 * @example
 * ```ts
 * keyBy(
 *  [
 *    { id: 'a', value: 1 },
 *    { id: 'b', value: 2 },
 *    { id: 'c', value: 3 },
 *  ],
 *  (item) => item.id
 * )
 * // {
 * //   a: { id: 'a', value: 1 },
 * //   b: { id: 'b', value: 2 },
 * //   c: { id: 'c', value: 3 }
 * // }
 * ```
 */
export function keyBy<T, K extends PropertyKey>(
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
