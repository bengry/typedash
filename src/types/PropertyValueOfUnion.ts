import type { Get, UnionToIntersection } from 'type-fest';

import type { KeysOfUnion } from './KeysOfUnion';

/**
 * Similar to `T[K]`, but gets the value of all the types in a union.
 */
export type PropertyValueOfUnion<
  T extends object,
  K extends KeysOfUnion<T>,
> = Get<UnionToIntersection<T>, K & string>;
