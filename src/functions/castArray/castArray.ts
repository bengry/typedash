import type { Many, Maybe } from '../../types';
import { castArrayIfDefined } from '../castArrayIfDefined';

// NOTE: all JSDocs here are duplicated of one another since there's no way to inherit them at this time.
// see https://github.com/microsoft/TypeScript/issues/407 for more info.

/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(value: null): T[];
/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(value: undefined): T[];
/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(value: readonly T[]): readonly T[];
/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(value: T[]): T[];
/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(
  value: Maybe<
    Many<NonNullable<T>, 'mutable'> | Many<NonNullable<T>, 'immutable'>
  >
): T[];
/**
 * Casts the input value to an array if it is not already an array.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(value: NonNullable<T>): T[];
/**
 * Implementation for all overloads.
 * @param value The input value to cast to an array.
 * @returns An array containing the input value, or the input value itself if it is already an array.
 * @example
 * ```ts
 * castArray('foo'); // ['foo']
 * castArray(['foo']); // ['foo']
 * castArray(null); // []
 * castArray(undefined); // []
 * ```
 */
export function castArray<T>(
  value: Maybe<
    Many<NonNullable<T>, 'mutable'> | Many<NonNullable<T>, 'immutable'>
  >
) {
  return castArrayIfDefined(value ?? []);
}
