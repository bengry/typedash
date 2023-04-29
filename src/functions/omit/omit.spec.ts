import { expect, it } from 'vitest';
import { omit } from './omit';

it('should omit a single property from an object', () => {
  expect(omit({ a: 1, b: '2', c: true }, 'a')).toEqual({ b: '2', c: true });
});

it('should omit specified properties from an object', () => {
  const object = { a: 1, b: '2', c: true };
  const result = omit(object, ['a', 'c']);
  const expected = { b: '2' };
  expect(result).toEqual(expected);
});

it('should return an empty object if input object is null or undefined', () => {
  const result1 = omit(null, [] as never[]);
  const result2 = omit(undefined, [] as never[]);
  const expected = {};
  expect(result1).toEqual(expected);
  expect(result2).toEqual(expected);
});

it('should handle union types for property keys', () => {
  type MyType = { a: number; b: string } | { c: boolean };
  const object = { a: 1, b: '2' } as MyType;
  const result = omit(object, ['a', 'c']);
  const expected = { b: '2' };
  expect(result).toEqual(expected);
});

it('should handle empty array of properties', () => {
  const object = { a: 1, b: '2', c: true };
  const result = omit(object, []);
  const expected = { a: 1, b: '2', c: true };
  expect(result).toEqual(expected);
});

it('should handle unknown properties', () => {
  const object = { a: 1, b: '2', c: true };
  const result = omit(
    object,
    // @ts-expect-error -- unknown property on purpose
    ['d']
  );
  const expected = { a: 1, b: '2', c: true };
  expect(result).toEqual(expected);
});
