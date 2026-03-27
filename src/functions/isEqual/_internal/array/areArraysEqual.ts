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

  // Direct index loop instead of zip() to avoid pulling in the zip module,
  // reducing isEqual's bundle footprint.
  for (let index = 0; index < array1.length; index++) {
    const element1 = array1[index];
    const element2 = array2[index];

    if (
      !context.equals(element1, element2, index, index, array1, array2, context)
    ) {
      return false;
    }
  }

  return true;
}
