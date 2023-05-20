/**
 * Changes the casing of a string to constant case.
 * @param string The input string to change the casing of.
 *
 * @returns A new string with the casing changed to constant case.
 *
 * @example
 * ```ts
 * constantCase('fooBar') // 'FOO_BAR'
 * constantCase('foo bar') // 'FOO_BAR'
 * constantCase('foo-bar') // 'FOO_BAR'
 * constantCase('fooBar42') // 'FOO_BAR42'
 * ```
 */
export function constantCase<S extends string>(string: S): ConstantCase<S> {
  if (!/[a-z]+/i.test(string)) {
    return '' as ConstantCase<S>;
  }

  // return string.replace(/[\W_]+/g, '_').toUpperCase() as ConstantCase<S>;
  return string
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toUpperCase() as ConstantCase<S>;
}

export type ConstantCase<S extends string> = Uppercase<
  S extends `${infer S1}${infer S2}`
    ? `${S1 extends '-'
        ? '_'
        : S1 extends ' '
        ? '_'
        : S1 extends '_'
        ? '_'
        : S1 extends Capitalize<S1>
        ? `_${Lowercase<S1>}`
        : S1}${ConstantCase<S2>}`
    : S
>;
