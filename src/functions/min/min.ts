import { Maybe } from '../../types';

/**
 * Computes the minimum value of array. If array is empty or nil, `undefined` is returned.
 */
export function min(array: readonly number[]): number;
export function min(array: Maybe<readonly number[]>): number | undefined;
export function min<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number
): number;
export function min<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number = (value) => value as unknown as number
): number | undefined {
  if (array == null || array.length === 0) {
    return undefined;
  }

  return Math.min(...array.map((element) => valueExtractor(element)));
}
