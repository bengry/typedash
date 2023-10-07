/**
 * Casts a type to a string.
 */
export type CastToString<T> = T extends number
  ? `${T}`
  : T extends symbol
  ? never
  : T;
