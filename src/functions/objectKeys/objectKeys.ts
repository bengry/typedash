import { StringKeyOf } from 'type-fest';

import { AnyFunction } from '../../types/internal';

export const objectKeys: ObjectKeys = Object.keys;

interface ObjectKeys {
  /**
   * Returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
   * Same as `Object.keys`, but with typed keys.
   *
   * @param object An object to get the keys of.
   *
   * @returns An array of strings that represent all the enumerable properties of the given object.
   *
   * @note The type of the object is inferred from the type of the `object` parameter, so if that's incorrect/incomplete
   * more keys might be returned than actually exist on the object. See https://github.com/Microsoft/TypeScript/issues/12870 for more info.
   *
   */
  <T extends object>(object: Exclude<T, AnyFunction>): StringKeyOf<T>[];
}
