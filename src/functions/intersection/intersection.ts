import { createTypeGuard } from '../createTypeGuard';

/**
 * Gets the intersection between two arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param comparator A function that determines whether two items are equal.
 * @returns An array with the intersection between the two arrays.
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function intersection<const T, const S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): S[];
/**
 * Gets the intersection between two arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param comparator A function that determines whether two items are equal.
 * @returns An array with the intersection between the two arrays.
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * ```
 */
export function intersection<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): S[];
// eslint-disable-next-line jsdoc/require-jsdoc -- implementation of the overload signatures
export function intersection<T, S extends T>(
  array1: readonly T[],
  array2: readonly S[],
  comparator?: Comparator<T, S>
): S[] {
  // no comparator provided - we can do a quicker check using `Object.is` via a Set.
  if (!comparator) {
    const isArray2Item = createTypeGuard(array2);
    // eslint-disable-next-line unicorn/no-array-callback-reference -- smaller bundle size, and we know that we're not using the other arguments in our implementation
    return array1.filter(isArray2Item);
  }

  return array1.filter((a1): a1 is Extract<T, S> =>
    array2.some((a2) => comparator(a1, a2))
  );
}

type Comparator<T, S extends T> =
  | ((a: T, b: S) => a is S)
  | ((a: T, b: S) => boolean);
