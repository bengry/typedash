import { Many, Maybe } from '../../types';
import { isArray } from '../isArray';

/**
 * Converts the given value to an array if it's not already one, or returns an value as-is if it's not defined (i.e. `null` or `undefined`).
 * @note If the value is already an array, it is returned as-is (same reference).
 *
 * @example
 * ```ts
 * // Returns `[1, 2, 3]`
 * castArrayIfDefined([1, 2, 3])
 *
 * // Returns `[42]`
 * castArrayIfDefined(42)
 *
 * // Returns `null`
 * castArrayIfDefined(null)
 *
 * // Returns `undefined`
 * castArrayIfDefined(undefined)
 * ```
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function castArrayIfDefined<T>(value: null): null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function castArrayIfDefined<T>(value: undefined): undefined;
export function castArrayIfDefined<T>(value: readonly T[]): readonly T[];
export function castArrayIfDefined<T>(value: T[]): T[];
export function castArrayIfDefined<T>(value: NonNullable<T>): T[];
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
