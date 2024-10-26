import type { Maybe } from '../../types';

/**
 * Computes the maximum value of array. If array is empty or nil, `undefined` is returned.
 * @param array The array to iterate over.
 * @returns The maximum value in the array, or `undefined` if the array is empty or nil.
 */
export function min(array: Maybe<readonly number[]>): number;
/**
 * Computes the minimum value of array. If array is empty or nil, `undefined` is returned.
 * @param array The array to iterate over.
 * @param valueExtractor An optional function used to extract a numeric value from each element.
 * @returns The element with the minimum value in the array according to the `valueExtractor`, or `undefined` if the array is empty or nil.
 */
export function min<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number
): T | undefined;
/**
 * Implementation for all overloads.
 * @param array The array to iterate over.
 * @param valueExtractor The function used to extract a numeric value from each element.
 * @returns The minimum value in the array, or `undefined` if the array is empty or nil.
 */
export function min<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number = (value) => value as unknown as number
): T | number | undefined {
  if (array == null || array.length === 0) {
    return undefined;
  }

  return array.reduce((a, b) =>
    valueExtractor(a) < valueExtractor(b) ? a : b
  );
}
