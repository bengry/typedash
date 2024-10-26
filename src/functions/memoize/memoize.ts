import type { AnyFunction } from '../../types/_internal';

/**
 * Memoizes a function.
 * @param fn The function to memoize.
 * @param cacheKeyResolver An optional function used to resolve the cache key. Defaults to the first argument in the function call.
 * @returns The memoized function.
 */
export function memoize<TFunction extends AnyFunction>(
  fn: TFunction,
  cacheKeyResolver?: (...args: Parameters<TFunction>) => string
): TFunction {
  const cache = new Map<unknown, ReturnType<TFunction>>();

  return function memoizedFunction(
    ...args: Parameters<TFunction>
  ): ReturnType<TFunction> {
    const cacheKey: unknown = cacheKeyResolver
      ? cacheKeyResolver(...args)
      : args[0];

    if (cache.has(cacheKey)) {
      // biome-ignore lint/style/noNonNullAssertion: we check using `has` before calling `get`
      return cache.get(cacheKey)!;
    }

    const result = fn(...args) as ReturnType<TFunction>;
    cache.set(cacheKey, result);

    return result;
  } as TFunction;
}
