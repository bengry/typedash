import { createTypeGuard } from '../createTypeGuard';

/**
 * Gets the intersection between two arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns An array with the intersection between the two arrays.
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function intersection<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[]
): (T & S)[] {
  const isArray2Item = createTypeGuard(array2);
  return array1.filter((value) => isArray2Item(value)) as (T & S)[];
}
