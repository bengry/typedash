import { Maybe } from '../../types';

/**
 * Returns the first `count` items from `array`, or removes the last `count` items from `array` if `count` is negative.
 * @param array The array to take items from.
 * @param count The number of items to take.
 * @returns The first `count` items from `array`.
 * @example
 * ```ts
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * take([1, 2, 3, 4, 5], -3) // [1, 2]
 * take([1, 2, 3, 4, 5], 0) // []
 * ```
 */
export function take<const T extends readonly any[], const C extends number>(
  array: Maybe<T>,
  count: C
): Take<T, C> {
  return (array?.slice(0, count) ?? []) as Take<T, C>;
}

type Take<
  TArray extends readonly any[],
  TCount extends number,
> = TCount extends 0
  ? []
  : `${TCount}` extends `-${infer N extends number}`
  ? RemoveFromEnd<TArray, N>
  : TArray extends readonly any[]
  ? TakeFromStart<TArray, TCount>
  : [];

type RemoveFromEnd<
  TArray extends readonly any[],
  TCount extends number,
  Removed extends any[] = [],
> = TCount extends Removed['length']
  ? TArray
  : TArray extends readonly [...infer Rest, infer Last]
  ? RemoveFromEnd<Rest, TCount, [...Removed, null]>
  : [];

type TakeFromStart<
  TArray extends readonly any[],
  TCount extends number,
  Taken extends any[] = [],
> = TArray['length'] extends 0
  ? Taken
  : TCount extends Taken['length']
  ? Taken
  : TArray extends readonly [infer First, ...infer Rest]
  ? TakeFromStart<Rest, TCount, [...Taken, First]>
  : [];
