import type { Many, Maybe } from '../../types';

export const isArray: IsArray = Array.isArray;

interface IsArray {
  /**
   * The same as `Array.isArray` but with a better type guard.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   * @example
   * ```ts
   * isArray([1, 2, 3]) // true
   * isArray('foo') // false
   * ```
   */
  <T>(value: Maybe<ArrayElement<T>[]>): value is NonNullable<typeof value>;
  /**
   * The same as `Array.isArray` but with a better type guard.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   * @example
   * ```ts
   * isArray([1, 2, 3]) // true
   * isArray('foo') // false
   * ```
   */
  <T>(
    value: Maybe<readonly ArrayElement<T>[]>
  ): value is NonNullable<typeof value>;

  /**
   * The same as `Array.isArray` but with a better type guard.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   * @example
   * ```ts
   * isArray([1, 2, 3]) // true
   * isArray('foo') // false
   * ```
   */
  <T>(value: Maybe<Many<T>>): value is NonNullable<readonly T[]>;
  /**
   * The same as `Array.isArray` but with a better type guard.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   * @example
   * ```ts
   * isArray([1, 2, 3]) // true
   * isArray('foo') // false
   * ```
   */
  <T>(value: unknown): value is readonly T[];
}

type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never;
