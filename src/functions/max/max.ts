import { Maybe } from '../../types';

/**
 * Computes the maximum value of array. If array is empty or nil, `undefined` is returned.
 * @param array The array to iterate over.
 * @returns The maximum value in the array, or `undefined` if the array is empty or nil.
 */
export function max<T>(array: Maybe<readonly T[]>): number;
/**
 * Computes the maximum value of array. If array is empty or nil, `undefined` is returned.
 * @param array The array to iterate over.
 * @param valueExtractor An optional function used to extract a numeric value from each element.
 * @returns The maximum value in the array, or `undefined` if the array is empty or nil.
 */
export function max<T>(
  array: Maybe<readonly T[]>,
  valueExtractor?: (value: T) => number
): number;
/**
 * Implementation for all overloads.
 * @param array The array to iterate over.
 * @param valueExtractor The function used to extract a numeric value from each element.
 * @returns The maximum value in the array, or `undefined` if the array is empty or nil.
 */
export function max<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number = (value) => value as unknown as number
): number | undefined {
  if (array == null || array.length === 0) {
    return undefined;
  }

  return Math.max(...array.map((element) => valueExtractor(element)));
}
