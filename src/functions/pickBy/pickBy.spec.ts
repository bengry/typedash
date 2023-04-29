import { expect, it } from 'vitest';

import { pickBy } from './pickBy';

it('pickBy returns an empty object if the input is null', () => {
  const result = pickBy(null, () => true);
  expect(result).toEqual({});
});

it('pickBy returns an empty object if the input is undefined', () => {
  const result = pickBy(undefined, () => true);
  expect(result).toEqual({});
});

it('pickBy returns a partial object with only the properties that pass the predicate', () => {
  const object = { a: 1, b: 2, c: 3 };
  const predicate = (value: number) => value % 2 === 0;
  const result = pickBy(object, predicate);
  expect(result).toEqual({ b: 2 });
});

it('pickBy returns an empty object if none of the properties pass the predicate', () => {
  const object = { a: 1, b: 3, c: 5 };
  const predicate = (value: number) => value % 2 === 0;
  const result = pickBy(object, predicate);
  expect(result).toEqual({});
});

it('pickBy returns a partial object with only the properties that pass the predicate, even if some properties are undefined', () => {
  const result = pickBy(
    { a: 1, b: undefined, c: 3 },
    (value) => value !== undefined
  );
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pickBy returns a partial object with only the properties that pass the predicate, even if some properties are null', () => {
  const object = { a: 1, b: null, c: 3 };
  const result = pickBy(object, (value) => value !== null);
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pickBy returns a partial object with only the properties that pass the predicate, even if some properties are falsy', () => {
  const result = pickBy({ a: 1, b: false, c: 3 }, (value) => !!value);
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pickBy returns a partial object with string keys and values of a different type', () => {
  const object = { a: '1', b: '2', c: '3' };
  const predicate = (value: string) => Number(value) % 2 === 0;
  const result = pickBy(object, predicate);
  expect(result).toEqual({ b: '2' });
});

it('pickBy returns a partial object with properties that pass the predicate, even if some properties are arrays', () => {
  const object = { a: [1, 2], b: [3, 4], c: [5, 6] };
  const predicate = (value: number[]) => value.length === 2;
  const result = pickBy(object, predicate);
  expect(result).toEqual({ a: [1, 2], b: [3, 4], c: [5, 6] });
});

it('pickBy returns a partial object with properties that pass the predicate, even for large input objects and predicates', () => {
  const object: Record<string, number> = {};
  const predicate = (value: number) => value % 2 === 0;
  for (let index = 0; index < 100_000; index++) {
    object[index.toString()] = index;
  }
  const result = pickBy(object, predicate);
  expect(Object.keys(result).length).toBeGreaterThan(0);
});
