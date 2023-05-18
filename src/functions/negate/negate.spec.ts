import { expect, expectTypeOf, it } from 'vitest';

import { negate } from './negate';

it('should return a function', () => {
  const result = negate(() => true);
  expect(result).toBeTypeOf('function');
  expectTypeOf(result).toBeFunction();
  expectTypeOf(result).returns.toBeBoolean();
});

it('should negate the result of the input function', () => {
  const input = (a: number, b: number) => a > b;
  const negated = negate(input);

  expect(negated(2, 1)).toBe(false);
  expect(negated(1, 2)).toBe(true);
});

it('should return a function with the same argument types as the input function', () => {
  const input = (a: number, b: string) => a > Number.parseInt(b);
  const negated = negate(input);

  expectTypeOf(negated).toMatchTypeOf<(a: number, b: string) => boolean>();
});
