import { KeysOfUnion } from '../../types';

export const objectEntries: ObjetEntries = Object.entries;

interface ObjetEntries {
  /**
   * Returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop. (The only important difference is that a for...in loop enumerates properties in the prototype chain as well.)
   * Same as `Object.entries()` but returns a typed array.
   * @param object An object whose enumerable own property [key, value] pairs are to be returned.
   * @returns An array of the given object's own enumerable string-keyed property [key, value] pairs.
   */
  <T extends object>(object: T): [KeysOfUnion<T>, T[keyof T]][];
}
