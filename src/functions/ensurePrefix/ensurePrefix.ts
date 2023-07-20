/**
 * Ensures that the string starts with the given prefix.
 * @param string The string to ensure the prefix of.
 * @param prefix The prefix to ensure.
 * @returns The string with the given prefix.
 * @example
 * ```ts
 * ensurePrefix('foo', 'bar'); // 'barfoo'
 * ensurePrefix('foobar', 'foo'); // 'foobar'
 * ```
 */
export function ensurePrefix<S extends string, Prefix extends string>(
  string: S,
  prefix: Prefix
): EnsurePrefix<S, Prefix> {
  if (string.startsWith(prefix)) {
    return string as EnsurePrefix<S, Prefix>;
  }

  return `${prefix}${string}` as EnsurePrefix<S, Prefix>;
}

type EnsurePrefix<
  S extends string,
  Prefix extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = S extends `${Prefix}${infer _Suffix}` ? S : `${Prefix}${S}`;
