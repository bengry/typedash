import { Maybe } from '../../types';

/**
 * Computes the maximum value of array. If array is empty or nil, `undefined` is returned.
 */
export function max(array: readonly number[]): number;
export function max(array: Maybe<readonly number[]>): number | undefined;
export function max<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number
): number;
export function max<T>(
  array: Maybe<readonly T[]>,
  valueExtractor: (value: T) => number = (value) => value as unknown as number
): number | undefined {
  if (array == null || array.length === 0) {
    return undefined;
  }

  return Math.max(...array.map((element) => valueExtractor(element)));
}
