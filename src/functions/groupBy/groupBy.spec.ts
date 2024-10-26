import { expect, it } from 'vitest';

import { groupBy } from './groupBy';

it('should group an array with groups of single items', () => {
  const array = [
    { name: 'a', value: 1 },
    { name: 'b', value: 2 },
    { name: 'c', value: 3 },
  ];

  const result = groupBy(array, (item) => item.name);
  expect(result).toEqual({
    a: [{ name: 'a', value: 1 }],
    b: [{ name: 'b', value: 2 }],
    c: [{ name: 'c', value: 3 }],
  });
});

it('should group an array with groups of multiple items', () => {
  const input = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Alice' },
    { id: 5, name: 'Charlie' },
    { id: 6, name: 'Bob' },
  ];

  const expectedOutput = {
    // biome-ignore lint/style/useNamingConvention: This is the value we want to test
    Alice: [
      { id: 1, name: 'Alice' },
      { id: 4, name: 'Alice' },
    ],
    // biome-ignore lint/style/useNamingConvention: This is the value we want to test
    Bob: [
      { id: 2, name: 'Bob' },
      { id: 6, name: 'Bob' },
    ],
    // biome-ignore lint/style/useNamingConvention: This is the value we want to test
    Charlie: [
      { id: 3, name: 'Charlie' },
      { id: 5, name: 'Charlie' },
    ],
  };

  const actualOutput = groupBy(input, (item) => item.name);

  expect(actualOutput).toEqual(expectedOutput);
});

it('should group an empty array', () => {
  const result = groupBy([], (item) => item);
  expect(result).toEqual({});
});

it('should group null', () => {
  const result = groupBy(null, () => 'foo');
  expect(result).toEqual({});
});
