import type { SnakeCase as SnakeCaseImplementation } from 'type-fest';

/**
 * Changes the casing of a string to snake case.
 * @param string The input string to change the casing of.
 * @returns A new string with the casing changed to snake case.
 * @example
 * ```ts
 * snakeCase('fooBar') // 'foo_bar'
 * snakeCase('foo bar') // 'foo_bar'
 * snakeCase('foo-bar') // 'foo_bar'
 * snakeCase('fooBar42') // 'foo_bar42'
 * ```
 */
export function snakeCase<S extends string>(string: S): SnakeCase<S> {
  if (!/[a-z]+/i.test(string)) {
    return string as SnakeCase<S>;
  }

  return string
    .replace(/[_-]+/g, ' ')
    .match(SNAKE_REGEX)
    ?.map((x) => x.toLowerCase())
    .join('_') as SnakeCase<S>;
}

const SNAKE_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g;

/**
 * Changes the casing of a string to snake case.
 * @see {@link snakeCase}.
 */
export type SnakeCase<S extends string> = TrimUnderscores<
  ReduceUnderscores<SnakeCaseImplementation<S>>
>;

/**
 * Reduces multiple underscores to a single underscore.
 * @param S The input string.
 * @returns A new string with multiple underscores reduced to a single underscore.
 * @example
 * ```ts
 * ReduceUnderscores<'foo__bar'> // 'foo_bar'
 * ReduceUnderscores<'foo_bar'> // 'foo_bar'
 * ReduceUnderscores<'foo___bar'> // 'foo_bar'
 * ```
 */
type ReduceUnderscores<S extends string> = S extends `${infer L}__${infer R}`
  ? ReduceUnderscores<`${L}_${R}`>
  : S extends `${infer L}${infer D}__${infer R}`
    ? ReduceUnderscores<`${L}${D}_${R}`>
    : S;

/**
 * Trims underscores from the start and end of a string.
 * @param S The input string.
 * @returns A new string with underscores trimmed from the start and end.
 * @example
 * ```ts
 * TrimUnderscores<'_foo_bar_'> // 'foo_bar'
 * TrimUnderscores<'foo_bar_'> // 'foo_bar'
 * TrimUnderscores<'_foo_bar'> // 'foo_bar'
 * TrimUnderscores<'foo_bar'> // 'foo_bar'
 * ```
 */
type TrimUnderscores<S extends string> = S extends `_${infer R}`
  ? TrimUnderscores<R>
  : S extends `${infer L}_`
    ? TrimUnderscores<L>
    : S;
