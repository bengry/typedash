import { Many, Maybe, KeysOfUnion } from '../../types';

export function omit<
  T extends object,
  const K extends keyof T | KeysOfUnion<T>
>(object: Maybe<T>, paths: Many<K>): Omit<T, K> {
  return omit(object, paths);
}
