export type CastToString<T> = T extends number
  ? `${T}`
  : T extends symbol
  ? never
  : T;
