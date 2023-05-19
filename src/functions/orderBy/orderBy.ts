import { KeysOfUnion, Many, Maybe } from '../../types';
import { castArray } from '../castArray';

export function orderBy<TValue, S>(
  array: Maybe<readonly TValue[]>,
  iteratees: Iteratee<TValue, S>[], // TODO: fix type to accept Many<>
  orders?: Many<Order>
): TValue[] {
  if (array == null) return [];

  const normalizedIteratees = castArray(iteratees).map((iteratee) =>
    typeof iteratee === 'function'
      ? iteratee
      : (value: TValue) => value[iteratee]
  );

  const normalizedOrders = castArray(orders);

  return [...array].sort((a, b) => {
    for (const [index, iteratee] of normalizedIteratees.entries()) {
      const normalizedOrder = normalizedOrders[index] ?? 'asc';
      const order = normalizedOrder === 'desc' ? -1 : 1;

      const aValue = iteratee(a);
      const bValue = iteratee(b);

      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }

    return 0;
  });
}

type Order = 'asc' | 'desc';

type Iteratee<TValue, TCompareBy> =
  | ((value: TValue) => TCompareBy)
  | KeysOfUnion<TValue>;
