import { compact } from '../compact';

/**
 * Asserts that a condition is true, throwing an Error if it is not.
 * @param condition A condition that should be true
 * @param message A message to use in the Error that will be thrown if the condition is falsy
 * @throws An `AssertionError` if the condition is falsy
 * @example
 * ```ts
 * function doWork(value: number | undefined) {
 *   assert(value !== undefined, 'value should be defined');
 *   // value is now narrowed to number
 *
 *   return value + 1;
 * }
 * ```
 * @example
 * ```ts
 * assert(1 === 1); // OK
 * assert(1 === 2); // throws AssertionError
 * assert(1 === 2, '1 should equal 2'); // throws AssertionError: 1 should equal 2
 * ```
 */
export function assert(
  condition?: unknown,
  message?: string
): asserts condition {
  if (
    // biome-ignore lint/complexity/noArguments: simpler than anything else to be honest
    arguments.length === 0
  ) {
    return;
  }

  if (!condition) {
    throw new AssertionError(message);
  }
}

/**
 * An error that is thrown when an assertion is not satisfied.
 * Thrown by {@link assert}.
 */
export class AssertionError extends Error {
  constructor(message?: string) {
    super(
      compact([
        'Assertion not satisfied',
        message ? `: "${message}"` : '',
      ]).join('')
    );
  }
}
