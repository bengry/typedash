/**
 * A no-operation function that returns `undefined` for any input.
 * @param args Any arguments.
 * @example
 * ```ts
 * noop() // undefined
 * noop(1, 2, 3) // undefined
 * ```
 */

// biome-ignore lint/correctness/noUnusedFunctionParameters: this is the whole point of the function
// biome-ignore lint/suspicious/noEmptyBlockStatements: this is the whole point of the function
export function noop(...args: readonly unknown[]): void {}
