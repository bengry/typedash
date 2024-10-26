import type { Maybe } from '../../types';

/**
 * Takes an array and returns an object with the keys of the array mapped to the items of the array.
 * @param array The array to iterate over.
 * @param getter The function used to extract the key from each element.
 * @returns An object with the keys mapped to the elements.
 * @example
 * ```ts
 * groupBy(
 *   [
 *     { id: 'a', value: 1 },
 *     { id: 'b', value: 1 },
 *     { id: 'c', value: 2 },
 *   ],
 *   (item) => item.value
 * )
 * // {
 * //   1: [
 * //     { id: 'a', value: 1 },
 * //     { id: 'b', value: 1 },
 * //   ],
 * //   2: [
 * //     { id: 'c', value: 2 },
 * //   ],
 * // }
 * ```
 */
export function groupBy<T, K extends string>(
  array: Maybe<readonly T[]>,
  getter: (item: T) => K
): Partial<Record<K, T[]>> {
  return (array ?? []).reduce(
    (draftGroups, currentItem) => {
      const key = getter(currentItem);

      draftGroups[key] ??= [];
      // biome-ignore lint/style/noNonNullAssertion: surely exists because of the line above
      draftGroups[key]!.push(currentItem);

      return draftGroups;
    },
    {} as Partial<Record<K, T[]>>
  );
}
