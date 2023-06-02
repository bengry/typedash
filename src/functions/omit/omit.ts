import { KeysOfUnion, Many, Maybe } from '../../types';
import {
  createObjectPredicate,
  filterObject,
  ObjectPredicate,
} from '../_internal/filterObject';
import { negate } from '../negate';

/**
 * Returns a new object with all properties except the specified properties from the input object.
 *
 * @param object The input object to omit properties from.
 * @param properties An array of property names to omit from the input object.
 *
 * @returns A new object with all properties except the specified properties from the input object.
 */
export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, properties: Many<K>): Omit<T, K>;
/**
 * Returns a new object with all properties except the properties that satisfy the predicate function from the input object.
 * @param object The input object to omit properties from.
 * @param predicate A function that takes a property value and its key and returns a boolean indicating whether to omit the property or not.
 *
 * @returns A new object with all properties except the properties that satisfy the predicate function from the input object.
 */
export function omit<T extends object>(
  object: Maybe<T>,
  predicate: ObjectPredicate<T>
): Partial<T>;
/**
 * Implementation of the omit function.
 */
export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: T, propertiesOrPredicate: Many<K> | ObjectPredicate<T>) {
  return filterObject(
    object,
    negate(createObjectPredicate(propertiesOrPredicate))
  );
}
