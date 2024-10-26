import type {
  CastToString,
  KeysOfUnion,
  Many,
  PropertyValueOfUnion,
} from '../../../types';
import { castArray } from '../../castArray';
import { createTypeGuard } from '../../createTypeGuard';

export function createObjectPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>,
>(properties: Many<K>): ObjectPredicate<T>;
export function createObjectPredicate<T extends object>(
  predicate: ObjectPredicate<T>
): ObjectPredicate<T>;
export function createObjectPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>,
>(propertiesOrPredicate: Many<K> | ObjectPredicate<T>): ObjectPredicate<T>;
export function createObjectPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>,
>(propertiesOrPredicate: Many<K> | ObjectPredicate<T>): ObjectPredicate<T> {
  return typeof propertiesOrPredicate === 'function'
    ? propertiesOrPredicate
    : createPropertiesPredicate(propertiesOrPredicate);
}

export type ObjectPredicate<T extends object> = (
  value: Exclude<PropertyValueOfUnion<T, KeysOfUnion<T>>, undefined>,
  key: CastToString<KeysOfUnion<T>>,
  object: T
) => boolean;

function createPropertiesPredicate<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>,
>(properties: Many<K>): ObjectPredicate<T> {
  const isKnownProperty = createTypeGuard(castArray(properties));

  return (_value, key) => isKnownProperty(key);
}
