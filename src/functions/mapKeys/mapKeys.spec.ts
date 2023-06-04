import { expect, it } from 'vitest';

import { mapKeys } from './mapKeys';

it('should return an empty object when given an empty object', () => {
  const input = {};
  const output = mapKeys(input, () => 'newKey');
  expect(output).toEqual({});
});

it('should return a new object with the same values as the input object', () => {
  const input = { a: 1, b: 2, c: 3 };
  const output = mapKeys(input, (key) => key.toUpperCase());
  expect(output).toEqual({ A: 1, B: 2, C: 3 });
});

it('should handle objects with non-string keys', () => {
  const input = { 1: 'one', 2: 'two', 3: 'three' };
  const output = mapKeys(input, (key) => Number(key) * 2);
  expect(output).toEqual({ 2: 'one', 4: 'two', 6: 'three' });
});

it('should handle objects with null or undefined values', () => {
  const input = { a: null, b: undefined };
  const output = mapKeys(input, (key) => key.toUpperCase());
  expect(output).toEqual({ A: null, B: undefined });
});
