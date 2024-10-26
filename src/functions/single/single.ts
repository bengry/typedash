import type { Maybe } from '../../types';
import { filter } from '../_internal/filterIterable';

/**
 * Returns the single element of an iterable, or `undefined` if there are zero or multiple matches.
 * @param source The iterable to search.
 * @returns The single element, or `undefined` if there are zero or multiple matches.
 * @example
 * ```ts
 * single([1, 2, 3]); // undefined (because there are multiple elements in the array)
 * single([1]); // 1 (because there's only one element in the array)
 * ```
 */
export function single<T>(source: Maybe<Iterable<T>>): T | undefined;
/**
 * Returns the single element of an iterable that satisfies a predicate.
 * @param source The iterable to search.
 * @param predicate The predicate function used to determine if an element is a match.
 * @returns The single matching element, or `undefined` if there are zero or multiple matches.
 * @example
 * ```ts
 * single([1, 2, 3], x => x % 2 === 0); // 2 (because there's only one even number in the array)
 * single([1, 2, 3], x => x >= 1); // undefined (because there are multiple matches for the predicate)
 * ```
 */
export function single<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
/**
 * Returns the single element of an iterable that satisfies a predicate.
 * @param source The iterable to search.
 * @param predicate The predicate function used to determine if an element is a match.
 * @returns The single matching element, or undefined if there are zero or multiple matches.
 * @example
 * ```ts
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * const people: (Person | number)[] = [
 *   { name: 'Alice', age: 30 },
 *   50,
 * ];
 *
 * declare function isPerson(value: unknown): value is Person;
 *
 * const result = single(people, isPerson); // { name: 'Alice', age: 30 }
 * //     ^? Person | undefined
 * ```
 */
export function single<T, S>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: S, index: number) => value is S
): S | undefined;
/**
 * Implementation for all overloads.
 * @param source The iterable to search.
 * @param predicate The predicate function used to determine if an element is a match.
 * @returns The single matching element, or undefined if there are zero or multiple matches.
 */
export function single<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): T | undefined {
  const relevantItems = filter(source, predicate);
  return relevantItems?.length === 1 ? relevantItems[0] : undefined;
}
