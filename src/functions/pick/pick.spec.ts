import { expect, it } from 'vitest';

import { pick } from './pick';

it('pick returns an empty object if the input is null or undefined', () => {
  const result1 = pick(null as unknown as Record<'a', unknown>, 'a');
  const result2 = pick(null, () => true);
  const result3 = pick(undefined, () => true);
  const result4 = pick(null, (value, key) => key === 'a' || value === 2);
  const result5 = pick(undefined, (value, key) => key === 'a' || value === 2);
  expect(result1).toEqual({});
  expect(result2).toEqual({});
  expect(result3).toEqual({});
  expect(result4).toEqual({});
  expect(result5).toEqual({});
});

it('pick returns a partial object with only the properties that pass the predicate', () => {
  const object = { a: 1, b: 2, c: 3 };
  const predicate = (value: number) => value % 2 === 0;
  const result = pick(object, predicate);
  expect(result).toEqual({ b: 2 });
});

it('pick returns an empty object if none of the properties pass the predicate', () => {
  const object = { a: 1, b: 3, c: 5 };
  const predicate = (value: number) => value % 2 === 0;
  const result = pick(object, predicate);
  expect(result).toEqual({});
});

it('pick returns a partial object with only the properties that pass the predicate, even if some properties are undefined', () => {
  const result = pick(
    { a: 1, b: undefined, c: 3 },
    (value) => value !== undefined
  );
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pick returns a partial object with only the properties that pass the predicate, even if some properties are null', () => {
  const object = { a: 1, b: null, c: 3 };
  const result = pick(object, (value) => value !== null);
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pick returns a partial object with only the properties that pass the predicate, even if some properties are falsy', () => {
  const result = pick({ a: 1, b: false, c: 3 }, (value) => !!value);
  expect(result).toEqual({ a: 1, c: 3 });
});

it('pick returns a partial object with string keys and values of a different type', () => {
  const object = { a: '1', b: '2', c: '3' };
  const predicate = (value: string) => Number(value) % 2 === 0;
  const result = pick(object, predicate);
  expect(result).toEqual({ b: '2' });
});

it('pick returns a partial object with properties that pass the predicate, even if some properties are arrays', () => {
  const object = { a: [1, 2], b: [3, 4], c: [5, 6] };
  const predicate = (value: number[]) => value.length === 2;
  const result = pick(object, predicate);
  expect(result).toEqual({ a: [1, 2], b: [3, 4], c: [5, 6] });
});

it('pick returns a partial object with properties that pass the predicate, even for large input objects and predicates', () => {
  const object: Record<string, number> = {};
  const predicate = (value: number) => value % 2 === 0;
  for (let index = 0; index < 100_000; index++) {
    object[index.toString()] = index;
  }
  const result = pick(object, predicate);
  expect(Object.keys(result).length).toBeGreaterThan(0);
});

it('picks properties based on a predicate function', () => {
  const object = { a: 1, b: 2, c: 3 };
  const result1 = pick(object, (value, key) => key === 'a' || value === 2);
  expect(result1).toEqual({ a: 1, b: 2 });

  const result2 = pick(
    object,
    (value, key, object_) => key === 'a' && object_.b === 2
  );
  expect(result2).toEqual({ a: 1 });

  const result3 = pick(object, () => false);
  expect(result3).toEqual({});
});
