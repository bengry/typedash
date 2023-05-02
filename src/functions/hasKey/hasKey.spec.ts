import { expect, it } from 'vitest';

import { hasKey } from './hasKey';

it('returns true for object with existing key', () => {
  const object = { foo: 'bar' };
  expect(hasKey(object, 'foo')).toBe(true);
});

it('returns false for object without existing key', () => {
  const object = { foo: 'bar' };
  expect(hasKey(object, 'baz')).toBe(false);
});

it('returns false for non-object value', () => {
  expect(hasKey(null as unknown as object, 'foo')).toBe(false);
  expect(hasKey(undefined as unknown as object, 'foo')).toBe(false);
});

it('returns true for object with symbol key', () => {
  const sym = Symbol('foo');
  const object = {
    [sym]: 'bar',
  };
  expect(hasKey(object, sym)).toBe(true);
});

it('correctly narrows type with existing key', () => {
  const object: object = { foo: 'bar' };
  if (hasKey(object, 'foo')) {
    expect(object.foo).toBe('bar');
    // @ts-expect-error -- TypeScript should catch this error
    expect(object.baz).toBe(undefined);
  }
});
