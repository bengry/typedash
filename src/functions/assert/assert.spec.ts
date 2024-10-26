import { expect, expectTypeOf, it } from 'vitest';

import type { Maybe } from '../../types';

import { assert, AssertionError } from './assert';

it('should not throw an error when called with no arguments', () => {
  expect(() => assert()).not.toThrow();
});

it('should throw an error when called with a falsy condition', () => {
  const run = () => assert(false, 'Condition was falsy');

  expect(run).toThrowError(AssertionError);
  expect(run).toThrowError(/Assertion not satisfied: "Condition was falsy"/);
});

it('should not throw an error when called with a truthy condition', () => {
  expect(() => assert(true)).not.toThrow();
});

it('should type check an expression', () => {
  const maybeValue = 'foo' as Maybe<string>;

  assert(maybeValue != null);

  expectTypeOf(maybeValue).toBeString();
});

it('should throw with a default message when called with a falsy condition and no message', () => {
  const run = () => assert(false);

  expect(run).toThrowError(AssertionError);
  expect(run).toThrowError(/Assertion not satisfied/);
});
