/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-useless-undefined */
import { it, expect } from 'vitest';
import { memoize } from './memoize';

it('should return the same result for the same input', () => {
  const add = (a: number, b: number) => a + b;
  const memoizedAdd = memoize(add);

  const result1 = memoizedAdd(1, 2);
  const result2 = memoizedAdd(1, 2);

  expect(result1).toEqual(result2);
});

it('should cache results for different inputs', () => {
  const add = (a: number, b: number) => a + b;
  const memoizedAdd = memoize(add);

  const result1 = memoizedAdd(1, 2);
  const result2 = memoizedAdd(2, 3);

  expect(result1).not.toEqual(result2);
});

it('should use cacheKeyResolver if provided', () => {
  const add = (a: number, b: number) => a + b;
  const memoizedAdd = memoize(add, (a, b) => `${a}-${b}`);

  const result1 = memoizedAdd(1, 2);
  const result2 = memoizedAdd(1, 2);

  expect(result1).toEqual(result2);
});

it('should cache results for different inputs with cacheKeyResolver', () => {
  const add = (a: number, b: number) => a + b;
  const memoizedAdd = memoize(add, (a, b) => `${a}-${b}`);

  const result1 = memoizedAdd(1, 2);
  const result2 = memoizedAdd(2, 3);

  expect(result1).to.not.equal(result2);
});

it('should work with functions that return undefined', () => {
  const fn = () => undefined;
  const memoizedFn = memoize(fn);

  const result1 = memoizedFn();
  const result2 = memoizedFn();

  expect(result1).toEqual(undefined);
  expect(result2).toEqual(result1);
});

it('should work with functions that return falsy values', () => {
  const fn = () => 0;
  const memoizedFn = memoize(fn);

  const result1 = memoizedFn();
  const result2 = memoizedFn();

  expect(result1).toEqual(0);
  expect(result2).toEqual(result1);
});

it('should work with functions that return truthy values', () => {
  const fn = () => 'hello';
  const memoizedFn = memoize(fn);

  const result1 = memoizedFn();
  const result2 = memoizedFn();

  expect(result1).toEqual('hello');
  expect(result2).toEqual(result1);
});

it('should work with functions that throw errors', () => {
  const fn = () => {
    throw new Error('error');
  };
  const memoizedFn = memoize(fn);

  expect(() => memoizedFn()).toThrowError('error');
});
