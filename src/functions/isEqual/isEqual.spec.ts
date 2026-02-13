import { describe, expect, it } from 'vitest';

import { isEqual } from './isEqual';

describe('object', () => {
  it('should return false when the objects have different key lengths', () => {
    const a = { bar: 'bar', foo: 'foo' };
    const b = { bar: 'bar', baz: 'baz', foo: 'foo' };

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return false when the objects have different keys', () => {
    const a = { bar: 'bar', foo: 'foo' };
    const b = { baz: 'bar', foo: 'foo' };

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return false when the objects are not equal in value', () => {
    const a = { bar: 'bar', foo: 'foo' };
    const b = { bar: 'baz', foo: 'foo' };

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return true when the objects are equal in value', () => {
    const a = { bar: 'bar', foo: 'foo' };
    const b = { bar: 'bar', foo: 'foo' };

    expect(isEqual(a, b)).toBe(true);
  });

  it('should handle symbol keys', () => {
    const object1 = {
      [Symbol.for('hi')]: 1,
    };
    const object2 = {
      [Symbol.for('hi')]: 2,
    };

    expect(isEqual(object1, object2)).toBe(false);
  });
});

describe('map', () => {
  it('should return false when maps are different sizes', () => {
    const a = new Map();
    const b = new Map([['foo', 'bar']]);

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return false when maps have different keys', () => {
    const a = new Map([['foo', 'bar']]);
    const b = new Map([['bar', 'bar']]);

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return false when maps have different values', () => {
    const a = new Map([['foo', 'bar']]);
    const b = new Map([['foo', 'baz']]);

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return true when maps have the same size, keys, and values', () => {
    const a = new Map([['foo', 'bar']]);
    const b = new Map([['foo', 'bar']]);

    expect(isEqual(a, b)).toBe(true);
  });

  it('should return true when maps have the same size, keys, and values regardless of order', () => {
    const a = new Map([
      ['foo', 'bar'],
      ['bar', 'foo'],
    ]);
    const b = new Map([
      ['foo', 'bar'],
      ['bar', 'foo'],
    ]);

    expect(isEqual(a, b)).toBe(true);
  });

  it.each([
    [
      'being different references but equal',
      [
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
      ],
      [
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
      ],
      true,
    ],
    [
      'being unequal based on first',
      [
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
      ],
      [
        ['foo', 'different'],
        [{ b: 'c' }, 2],
      ],
      false,
    ],
    [
      'being unequal based on last',
      [
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
      ],
      [
        [{ b: 'c' }, 2],
        ['foo', 'different'],
      ],
      false,
    ],
    [
      'being unequal based on an intermediary entry',
      [
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
        [{ b: 'c' }, 2],
      ],
      [
        [{ b: 'c' }, 2],
        ['foo', 'different'],
        [{ b: 'c' }, 2],
      ],
      false,
    ],
    // biome-ignore lint/suspicious/noExplicitAny: simpler to type as any since we know `a` and `b` will match fine
  ])('should handle `Map` entries %s', (_, aEntries: any[], bEntries: any[], expected) => {
    const mapA = new Map(aEntries);
    const mapB = new Map(bEntries);

    expect(isEqual(mapA, mapB)).toBe(expected);
    expect(isEqual(mapB, mapA)).toBe(expected);
  });
});

describe('set', () => {
  it('should handle keys on sets', () => {
    const a = new Set(['foo', 'bar']);
    const b = new Set(['foo', 'bar']);

    expect(isEqual(a, b)).toBe(true);
  });
});

describe('array', () => {
  it('should return false when the arrays are different lengths', () => {
    const a = ['foo', 'bar'];
    const b = ['foo', 'bar', 'baz'];

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return false when the arrays are not equal in value', () => {
    const a = ['foo', 'bar'];
    const b = ['foo', 'baz'];

    expect(isEqual(a, b)).toBe(false);
  });

  it('should return true when the arrays are equal in value', () => {
    const a = ['foo', 'bar'];
    const b = ['foo', 'bar'];

    expect(isEqual(a, b)).toBe(true);
  });
});

describe('circular references', () => {
  it('should handle shared references between objects', () => {
    const x = [1];
    const left = [{ a: [1], b: x }];
    const right = [{ a: x, b: [1] }];

    // should returns true, but returns false
    expect(isEqual(left, right)).toBe(true);
  });

  it('should handle shared circular arrays constructed differently', () => {
    type RecursiveArray = Array<number | RecursiveArray>;
    const x: RecursiveArray = [1];
    x.push(x);
    const left = [[1, x], x];
    const right = [x, [1, x]];

    expect(isEqual(left, right)).toBe(true);
  });
});
