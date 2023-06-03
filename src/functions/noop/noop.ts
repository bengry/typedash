/**
 * A no-operation function that returns `undefined` for any input.
 * @param args Any arguments.
 * @example
 * ```ts
 * noop() // undefined
 * noop(1, 2, 3) // undefined
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- this is the whole point of the function
export function noop(...args: readonly unknown[]): void {}
