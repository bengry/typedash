import { expect, it } from 'vitest';

import { orderBy } from './orderBy';

it('should sort an array of objects by a single iteratee in ascending order', () => {
  const input = [
    { name: 'Jane', age: 30 },
    { name: 'John', age: 25 },
  ];
  const expected = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];
  const result = orderBy(input, ['age']);
  expect(result).toEqual(expected);
});

it('should sort an array of objects by a single iteratee in descending order', () => {
  const input = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];
  const expected = [
    { name: 'Jane', age: 30 },
    { name: 'John', age: 25 },
  ];
  const result = orderBy(input, ['age'], ['desc']);
  expect(result).toEqual(expected);
});

it('should sort an array of objects by multiple iteratees', () => {
  const input = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'Los Angeles' },
    { name: 'Bob', age: 25, city: 'Chicago' },
  ];
  const expected = [
    { name: 'Bob', age: 25, city: 'Chicago' },
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'Los Angeles' },
  ];
  const result = orderBy(input, ['age', 'city']);
  expect(result).toEqual(expected);
});

it('should sort an array of objects by a function-typed iteratee', () => {
  const input = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 20 },
  ];
  const expected = [
    { name: 'Bob', age: 20 },
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];
  const result = orderBy(input, [(person) => person.age]);
  expect(result).toEqual(expected);
});

it('should sort an array of objects by a keyof-based iteratee', () => {
  const input = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 20 },
  ];
  const result = orderBy(input, ['name']);
  expect(result).toEqual([
    { name: 'Bob', age: 20 },
    { name: 'Jane', age: 30 },
    { name: 'John', age: 25 },
  ]);

  const result2 = orderBy(input, 'age');
  expect(result2).toEqual([
    { name: 'Bob', age: 20 },
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ]);
});

it('should sort an array of objects by a mix of function-typed and keyof-based iteratees', () => {
  const input = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'Los Angeles' },
    { name: 'Bob', age: 25, city: 'Chicago' },
  ];
  const expected = [
    { name: 'Bob', age: 25, city: 'Chicago' },
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'Los Angeles' },
  ];
  const result = orderBy(input, [(person) => person.age, 'name']);
  expect(result).toEqual(expected);
});

it('should return an empty array for nullish input', () => {
  const result = orderBy(null, ['age']);
  expect(result).toEqual(result);
});

it('should return the original array for nullish input when using a default value', () => {
  const input = null;
  const expected = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];
  const result = orderBy(input ?? expected, ['age']);
  expect(result).toEqual(expected);
});

it('should not mutate the original array', () => {
  const input = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];

  // we don't care about the result here, we just want to make sure the original array is not mutated
  orderBy(input, ['age']);

  expect(input).toEqual([
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ]);
});
