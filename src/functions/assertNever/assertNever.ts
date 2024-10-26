/**
 * Throws an error if a value is of type `never`.
 * Used for exhaustive checks.
 * @param inclusive The value to check.
 * @param noThrow If `true`, returns `undefined` instead of throwing an error.
 * @returns This function never returns a value, but throws an error if `inclusive` is of type `never`.
 * @example
 * ```typescript
 * assertNever('foo' as never); // throws an error
 * assertNever('foo' as never, true); // returns undefined
 * ```
 */
export function assertNever(inclusive: never, noThrow = false): never {
  if (noThrow) {
    return undefined as never;
  }

  throw new Error(`Unexpected inclusive value: ${inclusive}`);
}
