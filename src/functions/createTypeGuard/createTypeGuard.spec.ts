import { expect, expectTypeOf, it } from 'vitest';

import { createTypeGuard } from './createTypeGuard';

it('should return a type guard function', () => {
  const guard = createTypeGuard([]);
  expectTypeOf(guard).toMatchTypeOf<(v: unknown) => v is never>();
});

it('should return a type guard that returns true for known values', () => {
  const isFooOrBar = createTypeGuard(['foo', 'bar']);
  expect(isFooOrBar('foo')).toBe(true);
  expect(isFooOrBar('bar')).toBe(true);
});

it('should return a type guard that returns false for unknown values', () => {
  const isFooOrBar = createTypeGuard(['foo', 'bar']);
  expect(isFooOrBar('baz')).toBe(false);
  expect(isFooOrBar(42)).toBe(false);
  expect(isFooOrBar({})).toBe(false);
});

it('should return a type guard that narrows the type of the input value', () => {
  const guard = createTypeGuard(['foo', 'bar']);
  const value: unknown = 'foo';
  if (guard(value)) {
    expectTypeOf(value).toEqualTypeOf<'foo' | 'bar'>();
  }
});

it('should handle empty arrays', () => {
  const guard = createTypeGuard([]);
  expect(guard('foo')).toBe(false);
  expect(guard(42)).toBe(false);
  expect(guard({})).toBe(false);
});

it('should handle arrays with non-primitive values', () => {
  const valueA = { foo: 'bar' };
  const valueB = { baz: 'qux' };
  const guard = createTypeGuard([valueA, valueB]);
  expect(guard({ foo: 'bar' })).toBe(false);
  expect(guard(valueA)).toBe(true);
  expect(guard(valueB)).toBe(true);
  expect(guard({ foo: 'baz' })).toBe(false);
  expect(guard({})).toBe(false);
});
