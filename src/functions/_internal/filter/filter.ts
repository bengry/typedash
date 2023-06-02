import { Maybe } from '../../../types';

export function filter<T>(source: Maybe<Iterable<T>>): T[] | undefined;
export function filter<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): T[] | undefined;
export function filter<T, S>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: S, index: number) => value is S
): S[] | undefined;
export function filter<T>(
  source: Maybe<Iterable<T>>,
  predicate?: (value: T, index: number) => boolean
): T[] | undefined {
  if (source == null) {
    return undefined;
  }

  const relevantItems =
    predicate == null
      ? [...source]
      : // eslint-disable-next-line unicorn/no-array-callback-reference -- this is fine, we want to use the same predicate
        [...source].filter(predicate);

  return relevantItems;
}
