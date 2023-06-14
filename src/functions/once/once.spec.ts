/* eslint-disable unicorn/prevent-abbreviations */
import { expect, it } from 'vitest';

import { once } from './once';

it('should invoke the function only once', () => {
  let count = 0;
  const fn = once(() => {
    count++;
    return count;
  });

  expect(fn()).toBe(1);
  expect(fn()).toBe(1);
  expect(fn()).toBe(1);
});

it('should return the result of the first invocation', () => {
  const fn = once(() => 'hello');

  expect(fn()).toBe('hello');
  expect(fn()).toBe('hello');
  expect(fn()).toBe('hello');
});

it('should handle functions that return undefined', () => {
  let count = 0;
  const fn = once(() => {
    count++;
  });

  expect(fn()).toBeUndefined();
  expect(fn()).toBeUndefined();
  expect(fn()).toBeUndefined();
  expect(count).toBe(1);
});
