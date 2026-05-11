/**
 * A no-operation function that returns `undefined` for any input.
 * @param args Any arguments.
 * @example
 * ```ts
 * noop() // undefined
 * noop(1, 2, 3) // undefined
 * ```
 */

export function noop(..._args: readonly unknown[]): void {}
