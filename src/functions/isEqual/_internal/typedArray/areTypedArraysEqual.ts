import type { TypedArray } from 'type-fest';

import { zip } from '../../../zip';

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

  for (const [element1, element2] of zip(array1, array2)) {
    if (element1 !== element2) {
      return false;
    }
  }

  return true;
}
