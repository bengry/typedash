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

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- this is unexpected to happen, but if it does, it's better to have the value.
  throw new Error(`Unexpected inclusive value: ${inclusive}`);
}
