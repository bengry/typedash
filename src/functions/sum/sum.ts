import { Maybe } from '../../types';

export function sum(array: Maybe<readonly number[]>): number;
export function sum<T>(
  array: Maybe<readonly T[]>,
  mapper: ArrayIterator<T>
): number;
export function sum<T>(
  array: Maybe<readonly T[]>,
  mapper?: ArrayIterator<T>
): number {
  if (array == null) {
    return 0;
  }

  const numbers = array.map<number>((value, index, array_) => {
    const result =
      mapper?.(value, index, array_) ??
      // if there's no iteratee, we're in the overload of `sum` that only takes an array of numbers
      (value as number);
    return result;
  });

  return numbers.reduce((draft, value) => draft + value, 0);
}

type ArrayIterator<T> = (
  value: T,
  index: number,
  array: readonly T[]
) => number;
