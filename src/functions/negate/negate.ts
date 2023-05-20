import { AnyFunction } from '../../types/internal';

/**
 * Returns a new function that negates the result of the input function.
 * @param func The input function to negate.
 *
 * @returns A new function that negates the result of the input function.
 *
 * @example
 * ```ts
 * const isEven = (num: number) => num % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(1); // true
 * isOdd(2); // false
 * ```
 */
export function negate<Func extends AnyFunction<boolean>>(func: Func) {
  return (...args: Parameters<Func>) => {
    const result = func(...args);
    return !result;
  };
}
