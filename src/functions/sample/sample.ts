import { Maybe } from '../../types';

/**
 * Returns a random item from the input iterable.
 * @param source The iterable to get a random item from.
 * @returns A random item from the input iterable.
 * @example
 * ```ts
 * sample([1, 2, 3]) // 2
 * ```
 */
export function sample<const T>(source: Iterable<T>): T;
/**
 * Returns N random items from the input iterable.
 * If the input iterable has less than N items, all items will be returned.
 * @param source The iterable to get a random item from.
 * @param count The number of items to return.
 * @returns A random item from the input iterable.
 * @example
 * ```ts
 * sample([1, 2, 3], 2) // [2, 3]
 * sample([1, 2, 3], 4) // [1, 2, 3]
 * sample([1, 2, 3], 0) // []
 * sample([1, 2, 3], -1) // []
 * ```
 */
export function sample<const T>(source: Iterable<T>, count: number): T[];
/**
 * Returns a random item from the input iterable.
 * @param source The iterable to get a random item from.
 * @returns A random item from the input iterable.
 * @example
 * ```ts
 * sample(null) // undefined
 * sample(undefined) // undefined
 * ```
 */
export function sample<const T>(source: Maybe<Iterable<T>>): T | undefined;
/**
 * Returns N random items from the input iterable.
 * If the input iterable has less than N items, all items will be returned.
 * @param source The iterable to get a random item from.
 * @param count The number of items to return.
 * @returns A random item from the input iterable.
 * @example
 * ```ts
 * sample([1, 2, 3], 2) // [2, 3]
 * sample([1, 2, 3], 4) // [1, 2, 3]
 * sample([1, 2, 3], 0) // []
 * sample([1, 2, 3], -1) // []
 * ```
 */
export function sample<const T>(
  source: Maybe<Iterable<T>>,
  count: number
): T[] | undefined;
/**
 * Implementation for all overloads.
 * @param source The iterable to get a random item from.
 * @param count The number of items to return.
 * @returns A random item from the input iterable.
 */
export function sample<const T>(
  source: Maybe<Iterable<T>>,
  count = 1
): T | T[] | undefined {
  if (source == null) {
    return undefined;
  }

  const sourceArray = [...source];
  if (sourceArray.length === 0) {
    return undefined;
  }

  const sampleCount = Math.min(count, sourceArray.length);

  const indices = new Set<number>();
  while (indices.size < sampleCount) {
    indices.add(Math.floor(Math.random() * sourceArray.length));
  }

  const result: T[] = [];

  for (const index of indices) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we already know the index is valid because we generated to be within the bounds of the array
    result.push(sourceArray[index]!);
  }

  if (result.length === 1) {
    return result[0];
  }

  return result;
}
