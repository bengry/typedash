import { EmptyObject, Maybe } from '../../types';
import { isArray } from '../isArray';

/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty('abc') // false
 * ```
 */
export function isEmpty(value: string): value is '';
/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty(0) // true
 * isEmpty(1) // false
 * ```
 */
export function isEmpty(value: number): value is number;
/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty(new Map()) // true
 * isEmpty(new Map([['a', 1]])) // false
 *
 * isEmpty(new Set()) // true
 * isEmpty(new Set([1])) // false
 * ```
 */
export function isEmpty(
  value: Maybe<ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>>
): boolean;
/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty([]) // true
 * isEmpty([1]) // false
 * ```
 */
export function isEmpty<T extends ReadonlyArray<unknown> | EmptyArray>(
  value: Maybe<T>
): value is Maybe<T & EmptyArray>;
/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty({}) // true
 * isEmpty({ a: 1 }) // false
 * ```
 */
export function isEmpty<T extends object>(
  value: Maybe<EmptyObject<T> | T>
): value is T & Record<string, never>;
/**
 * Returns whether the input value is empty.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty(0) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(new Map()) // true
 * isEmpty(new Set()) // true
 * isEmpty(false) // true
 *
 * isEmpty(true) // false
 * isEmpty(1) // false
 * isEmpty('abc') // false
 * isEmpty([1]) // false
 * isEmpty({ a: 1 }) // false
 * isEmpty(new Map([['a', 1]])) // false
 * isEmpty(new Set([1])) // false
 * ```
 */
export function isEmpty<T>(value: Maybe<T>): boolean;
/**
 * Implementation for all overloads.
 * @param value The value to check.
 * @returns Whether the input value is empty.
 */
export function isEmpty<T>(value: Maybe<T>): boolean {
  if (value == null) {
    return true;
  }

  if (isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'number') {
    return !value;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

type EmptyArray = [];
