import { expect, it } from 'vitest';

import { mapValues } from './mapValues';

it('should map the values of an object', () => {
  const object = { a: 1, b: 2, c: 3 };
  const result = mapValues(object, (value) => value * 2);
  expect(result).toEqual({ a: 2, b: 4, c: 6 });
});

it('should map the values to a different type', () => {
  const object = { a: 1, b: 2, c: 3 };
  const result = mapValues(object, (count) => ({ count }));
  expect(result).toEqual({
    a: { count: 1 },
    b: { count: 2 },
    c: { count: 3 },
  });
});

it('should preserve the keys of the object', () => {
  const object = { a: 1, b: 2, c: 3 };
  const result = mapValues(object, (value) => value * 2);
  expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
});

it('should handle empty objects', () => {
  const object = {};
  const result = mapValues(object, (value) => value * 2);
  expect(result).toEqual({});
});

it('should handle different types of values', () => {
  const object = { a: 'hello', b: 123, c: true };
  const result = mapValues(object, String);
  expect(result).toEqual({ a: 'hello', b: '123', c: 'true' });
});
