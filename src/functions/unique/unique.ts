import { Maybe } from '../../types';

export function unique<T>(
  iterable: Maybe<Iterable<T>>,
  comparator: Comparator<T> = defaultComparator
): T[] {
  if (comparator === defaultComparator) {
    // we can get a performance boost for the default case, which is probably the most common.
    return [...new Set(iterable)];
  }

  const result: T[] = [];

  for (const value of iterable ?? []) {
    if (!result.some((other) => comparator(value, other))) {
      result.push(value);
    }
  }

  return result;
}

/**
 * Checks if two values are equal.
 */
type Comparator<T> = (a: T, b: T) => boolean;

const defaultComparator: Comparator<unknown> = Object.is;
