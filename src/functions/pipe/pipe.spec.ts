import { expect, it } from 'vitest';

import { pipe } from './pipe';

it('should work for simple operations', () => {
  const p = pipe(
    (n: number) => n ** 2,
    (x) => x.toString(),
    (x) => `${x} foo`,
    (x) => x.toUpperCase()
  );

  expect(p(2)).toBe('4 FOO');
});

it('should work for complex operations', () => {
  const p = pipe(
    (n: number) => n ** 2, // 4
    (x) => x.toString(), // "4"
    (x) => `${x} foo`, // "4 foo"
    (x) => x.toUpperCase(), // "4 FOO"
    (x) => x.split(' '), // ["4", "FOO"]
    (x) => x.map((s) => s.length), // [1, 3]
    (x) => x.reduce((accumulator, current) => accumulator + current, 0) // 4
  );

  expect(p(2)).toBe(4);
});

it('should not have types over 20 functions', () => {
  const p = pipe(
    /* 1 */ (n: number) => n ** 2, // 4
    /* 2 */ (x: number) => x.toString(), // "4"
    /* 3 */ (x: string) => `${x} foo`, // "4 foo"
    /* 4 */ (x: string) => x.toUpperCase(), // "4 FOO"
    /* 5 */ (x: string) => x.split(' '), // ["4", "FOO"]
    /* 6 */ (x: string[]) => x.map((s) => s.length), // [1, 3]
    /* 7 */ (x: string[]) => x.map((v) => v + 1), // [2, 4]
    /* 8 */ (x: string[]) => x.map((v) => v + 1), // [3, 5]
    /* 9 */ (x: string[]) => x.map((v) => v + 1), // [4, 6]
    /* 10 */ (x: string[]) => x.map((v) => v + 1), // [5, 7]
    /* 11 */ (x: string[]) => x.map((v) => v + 1), // [6, 8]
    /* 12 */ (x: string[]) => x.map((v) => v + 1), // [7, 9]
    /* 13 */ (x: string[]) => x.map((v) => v + 1), // [8, 10]
    /* 14 */ (x: string[]) => x.map((v) => v + 1), // [9, 11]
    /* 15 */ (x: string[]) => x.map((v) => v + 1), // [10, 12]
    /* 16 */ (x: string[]) => x.map((v) => v + 1), // [11, 13]
    /* 17 */ (x: string[]) => x.map((v) => v + 1), // [12, 14]
    /* 18 */ (x: string[]) => x.map((v) => v + 1), // [13, 15]
    /* 19 */ (x: string[]) => x.map((v) => v + 1), // [14, 16]
    /* 20 */ (x: string[]) => x.map((v) => v + 1), // [15, 17]
    /* 21 */ (x: string[]) => x.map((v) => v + 1), // [16, 18]
    /* 22 */ (x: string[]) => x.map((v) => v + 1) // [17, 19]
  );

  expect(p(2)).toEqual([17, 19]);
});
