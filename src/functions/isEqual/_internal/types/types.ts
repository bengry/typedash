export type EqualityComparator = <T1, T2>(
  value1: T1,
  value2: T2,
  state: Context
) => boolean;

export type TypeEqualityComparator<T> = (
  a: T,
  b: T,
  context: Context
) => boolean;

export interface Context {
  /**
   * Cache used to identify circular references
   */
  readonly cache: Cache<object, unknown>;
  /**
   * Method used to determine equality of nested value.
   */
  readonly equals: InternalEqualityComparator;
}

export type InternalEqualityComparator = (
  a: unknown,
  b: unknown,
  indexOrKeyA: unknown,
  indexOrKeyB: unknown,
  parentA: object,
  parentB: object,
  state: Context
) => boolean;

/**
 * Cache used to store references to objects, used for circular
 * reference checks.
 */

export interface Cache<Key extends object, Value> {
  delete(key: Key): boolean;
  get(key: Key): Value | undefined;
  set(key: Key, value: unknown): unknown;
}
