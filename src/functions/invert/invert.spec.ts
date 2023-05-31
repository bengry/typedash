import { expect, expectTypeOf, it } from 'vitest';

import { invert } from './invert';

it('should invert the keys and values of an object', () => {
  const input = { a: 'x', b: 'y', c: 'z' };
  const expected = { x: 'a', y: 'b', z: 'c' };
  expect(invert(input)).toEqual(expected);
});

it('should handle objects with duplicate values', () => {
  const input = { a: 'x', b: 'y', c: 'x' };
  const expected = { x: 'c', y: 'b' };
  expect(invert(input)).toEqual(expected);
});

it('should handle empty objects', () => {
  const input = {};
  const expected = {};
  expect(invert(input)).toEqual(expected);
});

it('should have the correct type signature', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types -- this is correct in this case
  expectTypeOf(invert({})).toEqualTypeOf<{}>();

  expectTypeOf(
    invert({
      a: 'x',
      b: 'y',
    })
  ).toEqualTypeOf<{
    x: 'a';
    y: 'b';
  }>();

  expectTypeOf(invert({ a: 1 })).toEqualTypeOf<{ 1: 'a' }>();

  const aSymbol = Symbol('value');
  expectTypeOf(invert({ a: aSymbol })).toEqualTypeOf<{ [aSymbol]: 'a' }>();
});
