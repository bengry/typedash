import { Maybe } from '../../types';

/**
 * Returns an array containing only the unique elements of the input iterable.
 * @note The order of the elements in the input matters, the first occurrence of an element (per the `comparator`) is the one that will be kept.
 * @param iterable The input iterable to extract unique elements from.
 * @param comparator An optional function that takes two elements and returns a boolean indicating whether they are equal. Defaults to the `Object.is` function.
 * @returns An array containing only the unique elements of the input iterable.
 * @example
 * unique([1, 2, 3, 2, 1, 4, 5, 4, 3]); // [1, 2, 3, 4, 5]
 * unique(['a', 'b', 'c', 'b', 'a']); // ['a', 'b', 'c']
 * unique([
 *     { id: 1, name: 'Alice' },
 *     { id: 2, name: 'Bob' },
 *     { id: 1, name: 'Alice', age: 42 },
 *   ],
 *   (a, b) => a.id === b.id
 * ) // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
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
