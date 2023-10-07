import { IsLiteral } from 'type-fest';

import { createTypeGuard } from '../createTypeGuard';
import { negate } from '../negate';

/**
 * Gets the difference between two arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param comparator A function that determines whether two items are equal.
 * @returns An array with the difference between the two arrays - items that are in the first array but not in the second.
 * @example
 * ```ts
 * difference([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function difference<const T, const S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): Array<IsLiteral<T> | IsLiteral<S> extends true ? Exclude<T, S> : T>;
/**
 * Gets the difference between two arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param comparator A function that determines whether two items are equal.
 * @returns An array with the difference between the two arrays - items that are in the first array but not in the second.
 * @example
 * ```ts
 * difference([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function difference<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): Array<IsLiteral<T> | IsLiteral<S> extends true ? Exclude<T, S> : T>;
// eslint-disable-next-line jsdoc/require-jsdoc -- implementation of the overload signatures
export function difference<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): Array<IsLiteral<T> | IsLiteral<S> extends true ? Exclude<T, S> : T> {
  // no comparator provided - we can do a quicker check using `Object.is` via a Set.
  if (!comparator) {
    const isArray2Item = createTypeGuard(array2);
    return array1.filter(negate(isArray2Item)) as Array<Exclude<T, S>>;
  }

  return array1.filter(
    (a1): a1 is Exclude<T, S> => !array2.some((a2) => comparator(a1, a2))
  );
}

type Comparator<T, S extends T> =
  | ((a: T, b: S) => a is Exclude<T, S>)
  | ((a: T, b: S) => boolean);
