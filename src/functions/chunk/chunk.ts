import { Maybe } from '../../types';

/**
 * Splits an array into chunks of the given size.
 *
 * @param array The array to split.
 * @param size The maximum size of each chunk.
 *
 * @returns An array of arrays where each sub-array has at most `size` elements.
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: Maybe<readonly T[]>, size: number): T[][] {
  if (array == null) {
    return [];
  }

  const chunks = [];
  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}

/**
 * Alias for {@link chunk}.
 */
export const chunkArray = chunk;
