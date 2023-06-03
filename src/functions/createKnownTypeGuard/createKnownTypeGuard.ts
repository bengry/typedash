/**
 * Creates a type guard that checks if the given type is assignable to the given type.
 * @param values The values to check against.
 * @template {TCheckedValue} The type to check against, `unknown` by default. Pass in if you want to have a narrowed type for the type predicate (e.g. `string`).
 * @returns A type guard that checks if the given type is assignable to the given type.
 * @example
 * ```ts
 * const VALID_VALUES = ['foo', 'bar'] as const;
 * const isValidValue = createKnownTypeGuard(VALID_VALUES);
 *
 * const value: unknown = '...';
 * if (isValidValue(value)) {
 *   // ✅ value is of type `'foo' | 'bar'`
 * }
 * ```
 */
export function createKnownTypeGuard<
  TValue,
  TCheckedValue extends TValue | unknown = unknown
>(values: Iterable<TValue>) {
  const setValues = new Set<unknown>(values);
  return function guardFunction(v: TCheckedValue): v is TCheckedValue & TValue {
    return setValues.has(v);
  };
}
