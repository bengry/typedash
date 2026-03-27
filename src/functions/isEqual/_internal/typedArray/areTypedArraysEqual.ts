import type { TypedArray } from 'type-fest';

/**
 * Whether the TypedArray instances are equal in value.
 * @param array1 The first TypedArray instance.
 * @param array2 The second TypedArray instance.
 * @returns true if the two TypedArray instances are equal, false otherwise.
 */
export function areTypedArraysEqual(array1: TypedArray, array2: TypedArray) {
  if (array1.length !== array2.length) {
    return false;
  }

  // Direct index loop instead of zip() to avoid pulling in the zip module,
  // reducing isEqual's bundle footprint.
  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }

  return true;
}
