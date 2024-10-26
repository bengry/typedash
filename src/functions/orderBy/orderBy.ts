import type { Primitive } from 'type-fest';

import type { KeysOfUnion, Many, Maybe } from '../../types';
import { castArray } from '../castArray';

/**
 * Sorts an array of objects by one or more properties, in ascending or descending order.
 * @param array The array of objects to sort.
 * @param iterators The property or properties to sort by. Can be a key of `TValue` or a function that returns a comparable value.
 * @param orders The order or orders to sort by. Can be "asc" or "desc". Defaults to "asc".
 * @returns A new array of objects sorted by the specified properties and orders.
 */
export function orderBy<TValue>(
  array: Maybe<readonly TValue[]>,
  iterators: Many<OrderByIterator<TValue>>,
  orders?: Many<Order>
): TValue[] {
  if (array == null) return [];

  const normalizedIteratees = castArray(iterators).map((iteratee) =>
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

      if (
        // biome-ignore lint/style/noNonNullAssertion: JS can compare null and undefined using `<` and
        aValue! < bValue!
      ) {
        return -1 * order;
      }

      if (
        // biome-ignore lint/style/noNonNullAssertion: JS can compare null and undefined using `<` and
        aValue! > bValue!
      ) {
        return 1 * order;
      }
    }

    return 0;
  });
}

type Order = 'asc' | 'desc';

type OrderByIterator<TValue> =
  | ((value: TValue) => ComparableValue)
  | KeysOfUnion<TValue>;

type ComparableValue =
  | Exclude<Primitive, symbol>
  | { [Symbol.toPrimitive](): Primitive }
  | { valueOf(): Primitive }
  | { toString(): string }
  | { [Symbol.toStringTag]: string };
