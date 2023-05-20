import { Maybe } from '../../types';

/**
 * Creates an array with all falsey values removed.
 * The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @param array The array to compact.
 *
 * @returns The new array of filtered values.
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
 * ```
 */
export function compact<T>(array: Maybe<readonly T[]>): T[] {
  return array?.filter(Boolean) ?? [];
}
