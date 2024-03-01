import { CamelCase as CamelCaseImplementation } from 'type-fest';

import { capitalize } from '../capitalize';

/**
 * Changes the casing of a string to kebab case.
 * @param string The input string to change the casing of.
 * @returns A new string with the casing changed to kebab case.
 * @example
 * ```ts
 * camelCase('fooBar') // 'fooFar'
 * camelCase('foo bar') // 'fooBar'
 * camelCase('foo-bar') // 'fooBar'
 * camelCase('fooBar42') // 'fooBar42'
 * ```
 */
export function camelCase<S extends string>(string: S): CamelCase<S> {
  if (!/[a-z]+/i.test(string)) {
    return string as CamelCase<S>;
  }

  const words = string.trim().split(wordsRegex);
  return words
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
    .join('') as CamelCase<S>;
}

/**
 * Changes the casing of a string to camel case.
 * @see {@link camelCase}.
 */
export type CamelCase<S extends string> = CamelCaseImplementation<S>;

const wordsRegex = /[\s_-]+|(?<=[a-z])(?=[A-Z])/;
