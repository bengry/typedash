type MutableMany<T> = T | T[];

type ImmutableMany<T> = T | readonly T[];

/**
 * Represents a value that can be either a single value or an array of values.
 */
export type Many<T, Type extends 'mutable' | 'immutable' = 'immutable'> = {
  immutable: ImmutableMany<T>;
  mutable: MutableMany<T>;
}[Type];
