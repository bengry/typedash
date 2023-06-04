/**
 * Returns the input value.
 * @template T The type of the input value.
 * @param value The input value.
 * @returns The input value.
 * @example
 * ```ts
 * identity('foo') // 'foo'
 * identity(42) // 42
 * identity({ foo: 'bar' }) // { foo: 'bar' }
 * ```
 */
export function identity<T>(value: T): T {
  return value;
}
