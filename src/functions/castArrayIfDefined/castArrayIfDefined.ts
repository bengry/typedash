import { Many, Maybe } from '../../types';
import { isArray } from '../isArray';

/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 * @param value The value to convert to an array if it's not already one.
 * @returns An array containing the input value, or the input value itself if it is already an array, or `null` or `undefined` if the input value is `null` or `undefined`.
 * @example
 * ```ts
 * castArrayIfDefined(null) // null
 * ```
 */
export function castArrayIfDefined(value: null): null;
/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 * @param value The value to convert to an array if it's not already one.
 * @example
 * ```ts
 * castArrayIfDefined(undefined) // undefined
 * ```
 */
export function castArrayIfDefined(value: undefined): undefined;
/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 * @param value The value to convert to an array if it's not already one.
 * @returns An array containing the input value, or the input value itself if it is already an array, or `null` or `undefined` if the input value is `null` or `undefined`.
 * @example
 * ```ts
 * castArrayIfDefined([1, 2, 3]) // [1, 2, 3]
 * ```
 */
export function castArrayIfDefined<T>(value: readonly T[]): readonly T[];
/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 * @param value The value to convert to an array if it's not already one.
 * @returns An array containing the input value, or the input value itself if it is already an array, or `null` or `undefined` if the input value is `null` or `undefined`.
 * @example
 * ```ts
 * castArrayIfDefined([1, 2, 3]) // [1, 2, 3]
 * ```
 */
export function castArrayIfDefined<T>(value: T[]): T[];
/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 * @param value The value to convert to an array if it's not already one.
 * @returns An array containing the input value, or the input value itself if it is already an array, or `null` or `undefined` if the input value is `null` or `undefined`.
 * @example
 * ```ts
 * castArrayIfDefined([1, 2, 3]) // [1, 2, 3]
 * castArrayIfDefined(42) // [42]
 * ```
 */
export function castArrayIfDefined<T>(value: NonNullable<T>): T[];
/**
 * Implementation for all overloads.
 * @param value The value to convert to an array if it's not already one.
 * @returns An array containing the input value, or the input value itself if it is already an array, or `null` or `undefined` if the input value is `null` or `undefined`.
 */
export function castArrayIfDefined<T>(
  value: Maybe<
    Many<NonNullable<T>, 'mutable'> | Many<NonNullable<T>, 'immutable'>
  >
) {
  if (value == null) {
    return value;
  }

  if (isArray(value)) {
    return value;
  }

  return [value];
}
