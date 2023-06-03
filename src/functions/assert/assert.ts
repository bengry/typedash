import { compact } from '../compact';

/**
 * Asserts that a condition is true, throwing an Error if it is not.
 * @param condition A condition that should be true
 * @param message A message to use in the Error that will be thrown if the condition is falsy
 * @throws An `AssertionError` if the condition is falsy
 */
export function assert(
  condition?: unknown,
  message?: string
): asserts condition {
  if (arguments.length === 0) {
    return;
  }

  if (!condition) {
    throw new AssertionError(message);
  }
}

export class AssertionError extends Error {
  constructor(message?: string) {
    super(
      compact([
        `Assertion not satisfied`,
        message ? `: "${message}"` : '',
      ]).join('')
    );
  }
}
