/**
 * Creates a type guard that checks if the given type is assignable to the given type.
 * @param values The values to check against.
 * @template {TInput} The type to check against, `unknown` by default. Pass in if you want to have a narrowed type for the type predicate (e.g. `string`).
 * @returns A type guard that checks if the given type is assignable to the given type.
 * @example
 * ```ts
 * const isValidValue = createTypeGuard(['foo', 'bar']);
 *
 * const value: unknown = '...';
 * if (isValidValue(value)) {
 *   // ✅ value is of type `'foo' | 'bar'`
 * }
 * ```
 */
export function createTypeGuard<
  const TKnownValue,
  TInput extends TKnownValue | unknown = unknown
>(values: Iterable<TKnownValue>): (v: TInput) => v is TInput & TKnownValue {
  const setValues = new Set<unknown>(values);
  return function predicate(v: unknown): v is TInput & TKnownValue {
    return setValues.has(v);
  };
}
