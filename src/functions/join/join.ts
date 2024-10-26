import type { NonFunction } from '../../types/_internal';

/**
 * Same as `Array.prototype.join`, but allows specifying a non-`string` separator.
 * @param elements The elements to join.
 * @param separator The separator to use.
 * @returns An array with the elements joined by the separator.
 */
// biome-ignore lint/suspicious/noExplicitAny: only used as generic constraints
export function join<T extends NonFunction<any>, U extends NonFunction<any>>(
  elements: readonly NonNullable<T>[],
  separator: U | ((index: number) => U)
): Array<symbol | U | NonNullable<T>> {
  const emptySeparator = Symbol('emptySeparator');

  const separatorFunction =
    typeof separator === 'function'
      ? (separator as (index: number) => NonNullable<U>)
      : () => separator;

  return elements
    .flatMap((element, index, array) => [
      element,
      index < array.length - 1 ? separatorFunction(index) : emptySeparator,
    ])
    .filter((item) => item !== emptySeparator);
}
