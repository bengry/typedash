import { expect, expectTypeOf, it } from 'vitest';

import { partition } from './partition';

it('partitions array of numbers', () => {
  const array = [1, 2, 3, 4, 5];
  const [evens, odds] = partition(array, (n) => n % 2 === 0);
  expect(evens).toEqual([2, 4]);
  expect(odds).toEqual([1, 3, 5]);
});

it('partitions array of strings and numbers', () => {
  const array = ['hello', 42, 'world', 99];
  const [strings, numbers] = partition(
    array,
    (item): item is string => typeof item === 'string'
  );

  expectTypeOf(strings).toEqualTypeOf<string[]>();
  expectTypeOf(numbers).toEqualTypeOf<number[]>();
  expect(strings).toEqual(['hello', 'world']);
  expect(numbers).toEqual([42, 99]);
});

it('returns empty arrays for null array', () => {
  const [equals, notEquals] = partition(null, () => true);
  expect(equals).toEqual([]);
  expect(notEquals).toEqual([]);
});

it('returns empty arrays for undefined array', () => {
  const [equals, notEquals] = partition(undefined, () => true);
  expect(equals).toEqual([]);
  expect(notEquals).toEqual([]);
});

it('partitions empty array', () => {
  const array: string[] = [];
  const [equals, notEquals] = partition(array, () => true);
  expect(equals).toEqual([]);
  expect(notEquals).toEqual([]);
});

it('partitions array of objects', () => {
  const array = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
  ];
  const [over30, under30] = partition(
    array,
    (object): object is { name: string; age: number } => object.age >= 30
  );
  expect(over30).toEqual([
    { name: 'Alice', age: 30 },
    { name: 'Charlie', age: 35 },
  ]);
  expect(under30).toEqual([{ name: 'Bob', age: 25 }]);
});
