import { AnyFunction } from '../../types/_internal';

/**
 * Invokes the given function only once, no matter how many times it's called.
 * If it was already invoked before, returns the result from the first invocation.
 * @template TFunction The type of the function to be invoked.
 * @param fn The function to be invoked.
 * @returns The result of the first invocation of the function.
 */
export function once<TFunction extends AnyFunction>(
  // eslint-disable-next-line unicorn/prevent-abbreviations -- `function` is a reserved word
  fn: TFunction
): TFunction {
  let result: ReturnType<TFunction> | undefined;
  let hasBeenCalled = false;

  return ((...args: Parameters<TFunction>) => {
    if (!hasBeenCalled) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = fn(...args);
      hasBeenCalled = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }) as TFunction;
}
