import { objectEntries } from '../objectEntries';
import { objectFromEntries } from '../objectFromEntries';

export function mapValues<T extends object, V>(
  object: T,
  mapperFunction: (value: T[keyof T], key: keyof T) => V
): Record<keyof T, V> {
  return objectFromEntries(
    objectEntries(object).map(([key, value]) => [
      key,
      mapperFunction(value, key),
    ])
  );
}
