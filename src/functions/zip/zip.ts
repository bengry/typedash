import type { TypedArray } from 'type-fest';

/**
 * Zips two arrays together into an array of tuples.
 * @param first The first array to zip.
 * @param second The second array to zip.
 * @returns An array of tuples containing the zipped values.
 */
export function zip<T, U>(
  first: readonly T[],
  second: readonly U[]
): Array<[T, U]>;
/**
 * Zips two typed arrays together into an array of tuples.
 * @param first The first array to zip.
 * @param second The second array to zip.
 * @returns An array of tuples containing the zipped values.
 */
export function zip<T extends TypedArray, U extends TypedArray>(
  first: T,
  second: U
): Array<[T[number], U[number]]>;
/**
 * Implementation for all overloads.
 * @param first The first array to zip.
 * @param second The second array to zip.
 * @returns An array of tuples containing the zipped values.
 */
export function zip<
  T extends readonly unknown[] | TypedArray,
  U extends readonly unknown[] | TypedArray,
>(first: T, second: U) {
  const result: Array<[T[number], U[number]]> = [];

  for (let index = 0; index < Math.min(first.length, second.length); index++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we're getting the min length first
    result.push([first[index]!, second[index]!]);
  }

  return result;
}
