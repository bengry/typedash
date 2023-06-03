import { Maybe } from '../../types';
import { filter } from '../_internal/filterIterable';

/**
 * Returns the number of elements in an iterable.
 * @param source The iterable to count.
 * @returns The number of elements.
 * @example
 * ```ts
 * count([1, 2, 3]); // 3
 * count([]); // 0
 * count(null); // 0
 * ```
 */
export function count<T>(source: Maybe<Iterable<T>>): number;
/**
 * Returns the number of elements in an iterable that satisfy a predicate.
 * @param source The iterable to count.
 * @param predicate The predicate function used to determine if an element is a match.
 * @returns The number of matching elements.
 * @example
 * ```ts
 * count([1, 2, 3], x => x % 2 === 0); // 1
 * count([1, 2, 3], x => x >= 2); // 2
 * count([], x => x >= 1); // 0
 * count(null, x => x >= 1); // 0
 * ```
 */
export function count<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): number;
/**
 * Implementation for all overloads.
 * @param source The iterable to count.
 * @param predicate The predicate function used to determine if an element is a match.
 * @returns The number of matching elements.
 */
export function count<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): number {
  const relevantItems = filter(source, predicate);
  return relevantItems?.length ?? 0;
}
