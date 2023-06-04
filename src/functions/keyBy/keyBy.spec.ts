import { expect, expectTypeOf, it } from 'vitest';

import { keyBy } from './keyBy';

it('should return an empty object when given an empty array', () => {
  const input: readonly { id: string }[] = [];
  const output = keyBy(input, (item) => item.id);
  expect(output).toEqual({});
});

it('should return an object with the keys mapped to the elements', () => {
  const input = [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
    { id: 'c', value: 3 },
  ];
  const output = keyBy(input, (item) => item.id);
  expect(output).toEqual({
    a: { id: 'a', value: 1 },
    b: { id: 'b', value: 2 },
    c: { id: 'c', value: 3 },
  });
});

it('should handle arrays with duplicate keys and have the last element determine the value for each key', () => {
  const input = [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
    { id: 'a', value: 3 },
  ];
  const output = keyBy(input, (item) => item.id);
  expect(output).toEqual({
    a: { id: 'a', value: 3 },
    b: { id: 'b', value: 2 },
  });
});

it('should handle arrays with non-string keys', () => {
  const input = [
    { id: 1, value: 'one' },
    { id: 2, value: 'two' },
    { id: 3, value: 'three' },
  ];
  const output = keyBy(input, (item) => item.id);
  expect(output).toEqual({
    1: { id: 1, value: 'one' },
    2: { id: 2, value: 'two' },
    3: { id: 3, value: 'three' },
  });

  expectTypeOf(output).toEqualTypeOf<
    Partial<Record<number, { id: number; value: string }>>
  >();
});
