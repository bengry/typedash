import { zip } from '../../../zip';
import type { Context } from '../types';

/**
 * Whether the arrays are equal in value.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param context The context object.
 * @returns true if the two arrays are equal, false otherwise.
 */
export function areArraysEqual(
  array1: readonly unknown[],
  array2: readonly unknown[],
  context: Context
) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (const [index, [element1, element2]] of zip(array1, array2).entries()) {
    if (
      !context.equals(element1, element2, index, index, array1, array2, context)
    ) {
      return false;
    }
  }

  return true;
}
