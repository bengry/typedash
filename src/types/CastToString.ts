export type CastToString<T> = T extends number | boolean
  ? `${T}`
  : T extends symbol
    ? never
    : T;
