/**
 * Checks if a value is not null or undefined.
 * @param value The value to inspect.
 * @returns Returns `true` if the value is NOT `null` or `undefined`, or `false` otherwise.
 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}
