/**
 * Returns the input value.
 * @template T The type of the input value.
 * @param value The input value.
 * @returns The input value.
 */
export function identity<T>(value: T): T {
  return value;
}
