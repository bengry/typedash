/**
 * Returns a new string with the first character capitalized.
 * @param string The input string to capitalize.
 *
 * @returns A new string with the first character capitalized.
 */
export function capitalize<S extends string>(string: S): Capitalize<S> {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}` as Capitalize<S>;
}
