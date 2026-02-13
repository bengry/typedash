import { capitalize } from '../capitalize';

/**
 * Converts a string to start case (first letter of each word capitalized, joined by spaces).
 * @param string The input string to convert to start case.
 * @returns A new string converted to start case.
 * @example
 * ```ts
 * startCase('--foo-bar--') // 'Foo Bar'
 * startCase('fooBar') // 'Foo Bar'
 * startCase('__FOO_BAR__') // 'FOO BAR'
 * ```
 */
export function startCase<S extends string>(string: S): StartCase<S> {
  if (!/[a-z]+/i.test(string)) {
    return string as unknown as StartCase<S>;
  }

  return string
    .match(WORDS_REGEX)
    ?.map((word) => capitalize(word))
    .join(' ') as StartCase<S>;
}

const WORDS_REGEX =
  /[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]+|\d+/g;

// Type-level helper: true for A-Z, false for digits/lowercase/special
type IsUpperLetter<C extends string> =
  C extends Uppercase<C> ? (C extends Lowercase<C> ? false : true) : false;

// Trim trailing spaces (from trailing separators like '--foo--')
type TrimTrailingSpaces<S extends string> = S extends `${infer L} `
  ? TrimTrailingSpaces<L>
  : S;

// Core recursive type: processes char-by-char with state
type StartCaseImpl<
  S extends string,
  PrevIsUpper extends boolean = false,
  AtWordStart extends boolean = true,
> = S extends `${infer C}${infer Rest}`
  ? C extends '-' | '_' | ' '
    ? // Separator: emit space (unless at start), mark next as word start
      `${AtWordStart extends true ? '' : ' '}${StartCaseImpl<Rest, false, true>}`
    : AtWordStart extends true
      ? // Word start: capitalize
        `${Uppercase<C>}${StartCaseImpl<Rest, IsUpperLetter<C>, false>}`
      : IsUpperLetter<C> extends true
        ? PrevIsUpper extends true
          ? // Consecutive uppercase: peek ahead to detect acronym end (FOOBar → FOO|Bar)
            Rest extends `${infer Next}${string}`
            ? Next extends '-' | '_' | ' '
              ? `${C}${StartCaseImpl<Rest, true, false>}`
              : IsUpperLetter<Next> extends true
                ? `${C}${StartCaseImpl<Rest, true, false>}`
                : ` ${C}${StartCaseImpl<Rest, true, false>}`
            : `${C}${StartCaseImpl<Rest, true, false>}`
          : // Uppercase after lowercase: new word
            ` ${C}${StartCaseImpl<Rest, true, false>}`
        : // Lowercase/digit: continue word
          `${C}${StartCaseImpl<Rest, false, false>}`
  : '';

/**
 * Converts a string to start case at the type level.
 * @see {@link startCase}.
 */
export type StartCase<S extends string> = TrimTrailingSpaces<StartCaseImpl<S>>;
