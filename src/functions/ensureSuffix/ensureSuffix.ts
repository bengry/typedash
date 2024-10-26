/**
 * Ensures that the string ends with the given suffix.
 * @param string The string to ensure the suffix of.
 * @param suffix The suffix to ensure.
 * @returns The string with the given suffix.
 * @example
 * ```ts
 * ensureSuffix('foo', 'bar'); // 'foobar'
 * ensureSuffix('foobar', 'bar'); // 'foobar'
 * ```
 */
export function ensureSuffix<S extends string, Suffix extends string>(
  string: S,
  suffix: Suffix
): EnsureSuffix<S, Suffix> {
  if (string.endsWith(suffix)) {
    return string as EnsureSuffix<S, Suffix>;
  }

  return `${string}${suffix}` as EnsureSuffix<S, Suffix>;
}

type EnsureSuffix<S extends string, Suffix extends string> = S extends `${
  // biome-ignore lint/style/useNamingConvention: we have to do something here for typescript to work
  infer _Prefix
}${Suffix}`
  ? S
  : `${S}${Suffix}`;
