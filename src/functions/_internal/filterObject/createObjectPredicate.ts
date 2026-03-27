import type {
  CastToString,
  KeysOfUnion,
  Many,
  PropertyValueOfUnion,
} from '../../../types';

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
  // Using a local Set instead of importing castArray + createTypeGuard to keep the
  // pick() dependency graph smaller (fewer chunks pulled in at bundle time).
  const knownProperties = new Set(
    Array.isArray(properties) ? properties : [properties]
  );

  return (_value, key) => knownProperties.has(key);
}
