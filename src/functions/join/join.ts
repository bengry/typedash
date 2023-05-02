import { NonFunction } from '../../types/internal';

/**
 * Same as `Array.prototype.join`, but allows specifying a non-`string` separator.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- only used as generic constraints
export function join<T extends NonFunction<any>, U extends NonFunction<any>>(
  elements: ReadonlyArray<NonNullable<T>>,
  separator: U | ((index: number) => U)
) {
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
