import { Maybe } from '../../types';

/**
 * Returns the first `count` items from `array`.
 * @param array The array to take items from.
 * @param count The number of items to take.
 * @returns The first `count` items from `array`.
 * @example
 * ```ts
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * ```
 */
export function take<T>(array: Maybe<readonly T[]>, count: number): T[] {
  if (count <= 0) {
    return [];
  }

  return array?.slice(0, count) ?? [];
}
