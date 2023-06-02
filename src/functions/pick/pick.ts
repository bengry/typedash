import { KeysOfUnion, Many, Maybe } from '../../types';
import {
  createObjectPredicate,
  filterObject,
  ObjectPredicate,
} from '../_internal/filterObject';

/**
 * Returns a new object with only the specified properties from the input object.
 *
 * @param object The input object to pick properties from.
 * @param properties An array of property names to pick from the input object.
 *
 * @returns A new object with only the specified properties from the input object.
 */
export function pick<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Pick<T, K>;
/**
 * Returns a new object with only the properties that satisfy the predicate function from the input object.
 *
 * @param object The input object to pick properties from.
 * @param predicate A function that takes a property value and its key and returns a boolean indicating whether to pick the property or not.
 *
 * @returns A new object with only the properties that satisfy the predicate function from the input object.
 */
export function pick<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
): Partial<T>;
/**
 * Implementation of the pick function.
 */
export function pick<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, propertiesOrPredicate: Many<K> | ObjectPredicate<T>) {
  return filterObject(object, createObjectPredicate(propertiesOrPredicate));
}
