import { expect, it } from 'vitest';

import { join } from './join';

it('should join an array of strings with a string separator', () => {
  const input = ['apple', 'banana', 'cherry'];
  const separator = ', ';
  const expectedOutput = ['apple', ', ', 'banana', ', ', 'cherry'];
  expect(join(input, separator)).toEqual(expectedOutput);
});

it('should join an array of numbers with a number separator', () => {
  const input = [1, 2, 3];
  const separator = 0;
  const expectedOutput = [1, 0, 2, 0, 3];
  expect(join(input, separator)).toEqual(expectedOutput);
});

it('should join an array of objects with an object separator', () => {
  const input = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
  const separator = { separator: true };
  const expectedOutput = [
    { name: 'Alice' },
    { separator: true },
    { name: 'Bob' },
    { separator: true },
    { name: 'Charlie' },
  ];
  expect(join(input, separator)).toEqual(expectedOutput);
});

it('should join an array of mixed types with a function separator', () => {
  const input = [1, 'apple', { name: 'Bob' }, true];
  const separator = (index: number) => (index % 2 === 0 ? ' | ' : ' - ');
  const expectedOutput = [
    1,
    ' | ',
    'apple',
    ' - ',
    { name: 'Bob' },
    ' | ',
    true,
  ];
  expect(join(input, separator)).toEqual(expectedOutput);
});

it('should handle empty arrays', () => {
  expect(join([], '-')).toEqual([]);
});

it('should handle arrays with a single element', () => {
  const input = ['hello'];
  const separator = '-';
  const expectedOutput = ['hello'];
  expect(join(input, separator)).toEqual(expectedOutput);
});

it('should handle arrays with null or undefined values', () => {
  const input = ['hello', 'world', 'test'];
  const separator = '-';
  const expectedOutput = ['hello', '-', 'world', '-', 'test'];
  expect(join(input, separator)).toEqual(expectedOutput);
});
