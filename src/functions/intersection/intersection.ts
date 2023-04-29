import { createKnownTypeGuard } from '../createKnownTypeGuard';

/**
 * Gets the intersection between two arrays.
 */
export function intersection<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[]
): (T & S)[] {
  const isArray2Item = createKnownTypeGuard(array2);
  return array1.filter((value) => isArray2Item(value)) as (T & S)[];
}
