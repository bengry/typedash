import { Maybe } from '../../types';

/**
 * Computes the sum of all values in array. If array is empty or nil, `0` is returned.
 * `null` or `undefined` values are treated as `0`.
 * @param array The array to iterate over.
 * @returns The sum of all values in the array, or `0` if the array is empty or nil.
 * @example
 * ```ts
 * sum([1, 2, 3]); // 6
 * sum([]); // 0
 * sum(null); // 0
 * sum([1, 2, null, 3, undefined, 4]); // 10
 * ```
 */
export function sum(array: Maybe<ReadonlyArray<Maybe<number>>>): number;
/**
 * Computes the sum of all values in array. If array is empty or nil, `0` is returned.
 * @param array The array to iterate over.
 * @param mapper The function used to extract a numeric value from each element.
 * @returns The sum of all values in the array, or `0` if the array is empty or nil.
 * @example
 * ```ts
 * sum([
 *   { value: 1 },
 *   { value: 2 },
 *   { value: 3 }
 * ], (element) => element.value); // 6
 * ```
 */
export function sum<T>(
  array: Maybe<readonly T[]>,
  mapper: ArrayIterator<T>
): number;
/**
 * Implementation for all overloads.
 * @param array The array to iterate over.
 * @param mapper The function used to extract a numeric value from each element.
 * @returns The sum of all values in the array, or `0` if the array is empty or nil.
 */
export function sum<T>(
  array: Maybe<ReadonlyArray<Maybe<T>>>,
  mapper?: ArrayIterator<Maybe<T>>
): number {
  if (array == null) {
    return 0;
  }

  const numbers = array.map<number>((value, index, array_) => {
    const result =
      mapper?.(value, index, array_) ??
      // if there's no iteratee, we're in the overload of `sum` that only takes an array of numbers
      ((value ?? 0) as number);
    return result;
  });

  return numbers.reduce((draft, value) => draft + value, 0);
}

type ArrayIterator<T> = (
  value: T,
  index: number,
  array: readonly T[]
) => number;
