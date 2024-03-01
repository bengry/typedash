import { KebabCase as KebabCaseImplementation } from 'type-fest';

/**
 * Changes the casing of a string to kebab case.
 * @param string The input string to change the casing of.
 * @returns A new string with the casing changed to kebab case.
 * @example
 * ```ts
 * kebabCase('fooBar') // 'foo-bar'
 * kebabCase('foo bar') // 'foo-bar'
 * kebabCase('foo-bar') // 'foo-bar'
 * kebabCase('fooBar42') // 'foo-bar42'
 * ```
 */
export function kebabCase<S extends string>(string: S): KebabCase<S> {
  if (!/[a-z]+/i.test(string)) {
    return string as KebabCase<S>;
  }

  return string
    .match(KEBAB_REGEX)
    ?.map((x) => x.toLowerCase())
    .join('-') as KebabCase<S>;
}

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g;

/**
 * Changes the casing of a string to kebab case.
 * @see {@link kebabCase}.
 */
export type KebabCase<S extends string> = TrimDashes<
  ReduceDashes<KebabCaseImplementation<S>>
>;

/**
 * Reduces multiple dashes to a single dash.
 * @param S The input string.
 * @returns A new string with multiple dashes reduced to a single dash.
 * @example
 * ```ts
 * ReduceDashes<'foo--bar'> // 'foo-bar'
 * ReduceDashes<'foo-bar'> // 'foo-bar'
 * ReduceDashes<'foo---bar'> // 'foo-bar'
 * ```
 */
type ReduceDashes<S extends string> = S extends `${infer L}--${infer R}`
  ? ReduceDashes<`${L}-${R}`>
  : S extends `${infer L}${infer D}--${infer R}`
    ? ReduceDashes<`${L}${D}-${R}`>
    : S;

/**
 * Trims dashes from the start and end of a string.
 * @param S The input string.
 * @returns A new string with dashes trimmed from the start and end.
 * @example
 * ```ts
 * TrimDashes<'-foo-bar-'> // 'foo-bar'
 * TrimDashes<'foo-bar-'> // 'foo-bar'
 * TrimDashes<'-foo-bar'> // 'foo-bar'
 * TrimDashes<'foo-bar'> // 'foo-bar'
 * ```
 */
type TrimDashes<S extends string> = S extends `-${infer R}`
  ? TrimDashes<R>
  : S extends `${infer L}-`
    ? TrimDashes<L>
    : S;
