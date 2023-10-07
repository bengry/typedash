import { expect, expectTypeOf, it } from 'vitest';

import { intersection } from './intersection';

it('should return an empty array when given empty arrays', () => {
  const result = intersection([], []);
  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<never[]>();
});

it('should return an empty array when given arrays with no common elements', () => {
  const result = intersection([1, 2, 3] as number[], [4, 5, 6]);
  expect(result).toEqual([]);
  expectTypeOf(result).toEqualTypeOf<Array<4 | 5 | 6>>();
});

it('should return an array with common elements when given arrays with common elements', () => {
  const result = intersection([1, 2, 3], [2, 1]);
  expect(result).toEqual([1, 2]);
  expectTypeOf(result).toEqualTypeOf<Array<1 | 2>>();

  const result2 = intersection([1, 2, 3] as number[], [2, 3] as number[]);
  expectTypeOf(result2).toEqualTypeOf<number[]>();
});

it('should return an array with common elements when given arrays with common elements and a comparator function', () => {
  const result = intersection(
    [{ id: 1 }, { id: 2 }, { id: 3 }] as Array<{ id: number }>,
    [{ id: 2 }, { id: 3 }, { id: 4 }] as Array<{ id: number }>,
    (a, b) => a.id === b.id
  );
  expect(result).toEqual([{ id: 2 }, { id: 3 }]);
  expectTypeOf(result).toEqualTypeOf<Array<{ id: number }>>();
});

it('should return an array with common elements when given arrays with common elements and a comparator function that compares by reference', () => {
  const object1 = { id: 1 };
  const object2 = { id: 2 };
  const object3 = { id: 3 };
  const result = intersection(
    [object1, object2, object3],
    [object2, object3, { id: 4 }],
    Object.is
  );
  expect(result).toEqual([object2, object3]);
});

it('should return an array with common elements when given arrays with common elements and a comparator function that compares by value', () => {
  const result = intersection([1, 2, 3], [2, 3], (a, b) => a + 1 === b);
  expect(result).toEqual([1, 2]);
  expectTypeOf(result).toEqualTypeOf<Array<2 | 3>>();

  const result2 = intersection([1, 2, 3], [2, 3, 4], (a, b) => a + 1 === b);
  expect(result).toEqual([1, 2]);
  expectTypeOf(result2).toEqualTypeOf<number[]>();
});

it('should return an array with common elements when given arrays with common elements and a comparator function that compares by value and reference', () => {
  const object1 = { id: 1 };
  const object2 = { id: 2 };
  const object3 = { id: 3 };
  const result = intersection(
    [object1, object2, object3],
    [object2, object3, { id: 4 }],
    (a, b) => a.id === b.id && Object.is(a, b)
  );
  expect(result).toEqual([object2, object3]);
});
