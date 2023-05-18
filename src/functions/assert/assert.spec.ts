import { expect, expectTypeOf, it } from 'vitest';

import { Maybe } from '../../types';

import { assert, AssertionError } from './assert';

it('should not throw an error when called with no arguments', () => {
  expect(() => assert()).not.toThrow();
});

it('should throw an error when called with a falsy condition', () => {
  expect(() => assert(false, 'Condition was falsy')).toThrowError(
    AssertionError
  );
});

it('should not throw an error when called with a truthy condition', () => {
  expect(() => assert(true)).not.toThrow();
});

it('should type check an expression', () => {
  const maybeValue = 'foo' as Maybe<string>;

  assert(maybeValue != null);

  expectTypeOf(maybeValue).toBeString();
});
