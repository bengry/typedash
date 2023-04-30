import { Maybe } from '../../types';

export function sumBy<T>(
  array: Maybe<readonly T[]>,
  iteratee: (value: T, index: number, array: readonly T[]) => number
): number {
  if (array == null) {
    return 0;
  }

  return array.reduce(
    (sum, value, index) => sum + iteratee(value, index, array),
    0
  );
}
