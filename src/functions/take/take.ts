import { Maybe } from '../../types';

/**
 * Returns the first `count` items from `array`.
 * @param array The array to take items from.
 * @param count The number of items to take.
 * @returns The first `count` items from `array`.
 * @example
 * ```ts
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * ```
 */
export function take<const T extends readonly unknown[], C extends number>(
  array: Maybe<T>,
  count: C
): Take<T, C> {
  if (count <= 0) {
    return [] as Take<T, C>;
  }

  return (array?.slice(0, count) ?? []) as Take<T, C>;
}

type Take<
  TArray extends readonly unknown[],
  TCount extends number,
> = TCount extends 0
  ? []
  : `${TCount}` extends `-${number}`
    ? []
    : TArray extends readonly unknown[]
      ? TakeFromStart<TArray, TCount>
      : [];

type TakeFromStart<
  TArray extends readonly unknown[],
  TCount extends number,
  Taken extends unknown[] = [],
> = TArray['length'] extends 0
  ? Taken
  : TCount extends Taken['length']
    ? Taken
    : TArray extends readonly [infer First, ...infer Rest]
      ? TakeFromStart<Rest, TCount, [...Taken, First]>
      : Array<TArray[number]>;
