import type { Maybe } from '../../types';

/**
 * Returns a new array with elements randomly reordered using the Fisher-Yates algorithm.
 * Does not mutate the input array.
 * @param array The array to shuffle.
 * @returns A new array with the same elements in a random order.
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4]) // e.g. [3, 1, 4, 2]
 * shuffle([]) // []
 * shuffle(null) // []
 * shuffle(undefined) // []
 * ```
 */
export function shuffle<T>(array: Maybe<readonly T[]>): T[] {
  const result = [...(array ?? [])];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // biome-ignore lint/style/noNonNullAssertion: indices i and j are guaranteed to be within bounds
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}
