import type { Dictionary } from './Dictionary';

/**
 * Get the properties to strictly examine, which include both own properties that are
 * not enumerable and symbol properties.
 * @param object The object to get the properties for.
 * @returns The properties to strictly examine.
 */
export function getObjectProperties(
  object: Dictionary
): Array<string | symbol> {
  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
  ];
}
