// eslint-disable-next-line max-len
/* eslint-disable unicorn/prevent-abbreviations, unicorn/new-for-builtins, no-new-wrappers -- we do these things on purpose to test */

import * as React from 'react';
import { describe, expect, test } from 'vitest';

import { isEqual } from './isEqual';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const fn = () => {};
const promise = Promise.resolve('foo');

const testSuites = [
  {
    name: 'primitives',
    tests: [
      {
        name: 'equal numbers',
        value1: 1,
        value2: 1,
        expected: true,
      },
      {
        name: 'not equal numbers',
        value1: 1,
        value2: 2,
        expected: false,
      },
      {
        name: 'equal zero',
        value1: 0,
        value2: 0,
        expected: true,
      },
      {
        name: 'equal positive and negative zero',
        value1: -0,
        value2: 0,
        expected: true,
      },
      {
        name: 'equal Infinity',
        value1: Number.POSITIVE_INFINITY,
        value2: Number.POSITIVE_INFINITY,
        expected: true,
      },
      {
        name: 'not equal Infinity',
        value1: Number.NEGATIVE_INFINITY,
        value2: Number.POSITIVE_INFINITY,
        expected: false,
      },
      {
        name: 'equal number objects',
        value1: new Number(1),
        value2: new Number(1),
        expected: true,
      },
      {
        name: 'not equal number objects',
        value1: new Number(1),
        value2: new Number(2),
        expected: false,
      },
      {
        name: 'number and array are not equal',
        value1: 1,
        value2: [],
        expected: false,
      },
      {
        expected: false,
        name: '0 and null are not equal',
        value1: 0,
        value2: null,
      },
      {
        expected: true,
        name: 'NaN and NaN are equal',
        value1: Number.NaN,
        value2: Number.NaN,
      },
      {
        expected: true,
        name: 'equal strings',
        value1: 'a',
        value2: 'a',
      },
      {
        name: 'not equal strings',
        value1: 'a',
        value2: 'b',
        expected: false,
      },
      {
        name: 'equal string objects',
        value1: new String('foo'),
        value2: new String('foo'),
        expected: true,
      },
      {
        name: 'not equal string objects',
        value1: new String('foo'),
        value2: new String('bar'),
        expected: false,
      },
      {
        name: 'empty string and null are not equal',
        value1: '',
        value2: null,
        expected: false,
      },
      {
        name: 'null is equal to null',
        value1: null,
        value2: null,
        expected: true,
      },
      {
        name: 'equal booleans (true)',
        value1: true,
        value2: true,
        expected: true,
      },
      {
        name: 'equal booleans (false)',
        value1: false,
        value2: false,
        expected: true,
      },
      {
        name: 'equal boolean objects (true)',
        value1: new Boolean(true),
        value2: new Boolean(true),
        expected: true,
      },
      {
        name: 'equal boolean objects (false)',
        value1: new Boolean(false),
        value2: new Boolean(false),
        expected: true,
      },
      {
        name: 'not equal booleans',
        value1: true,
        value2: false,
        expected: false,
      },
      {
        name: 'not equal boolean objects',
        value1: new Boolean(true),
        value2: new Boolean(false),
        expected: false,
      },
      {
        name: '1 and true are not equal',
        value1: 1,
        value2: true,
        expected: false,
      },
      {
        name: '0 and false are not equal',
        value1: 0,
        value2: false,
        expected: false,
      },
    ],
  },
  {
    name: 'functions',
    tests: [
      {
        name: 'function and the same function are equal',
        value1: fn,
        value2: fn,
        expected: true,
      },
      {
        name: 'function and different function are not equal',
        value1: fn,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        value2: () => {},
        expected: false,
      },
    ],
  },
  {
    name: 'objects',
    tests: [
      {
        name: 'empty objects are equal',
        value1: {},
        value2: {},
        expected: true,
      },
      {
        name: 'empty objects with `null` as prototype are equal',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value1: Object.create(null),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value2: Object.create(null),
        expected: true,
      },
      {
        name: 'equal objects (same properties "order")',
        value1: {
          a: 1,
          b: '2',
        },
        value2: {
          a: 1,
          b: '2',
        },
        expected: true,
      },
      {
        name: 'equal objects (different properties "order")',
        value1: {
          a: 1,
          b: '2',
        },
        value2: {
          a: 1,
          b: '2',
        },
        expected: true,
      },
      {
        name: 'not equal objects (extra property)',
        value1: {
          a: 1,
          b: '2',
        },
        value2: {
          a: 1,
          b: '2',
          c: [],
        },
        expected: false,
      },
      {
        name: 'not equal objects (different properties)',
        value1: {
          a: 1,
          b: '2',
          c: 3,
        },
        value2: {
          a: 1,
          b: '2',
          d: 3,
        },
        expected: false,
      },
      {
        name: 'not equal objects (different properties)',
        value1: {
          a: 1,
          b: '2',
          c: 3,
        },
        value2: {
          a: 1,
          b: '2',
          d: 3,
        },
        expected: false,
      },
      {
        name: 'equal objects (same sub-properties)',
        value1: { a: [{ b: 'c' }] },
        value2: { a: [{ b: 'c' }] },
        expected: true,
      },
      {
        name: 'not equal objects (different sub-property value)',
        value1: { a: [{ b: 'c' }] },
        value2: { a: [{ b: 'd' }] },
        expected: false,
      },
      {
        name: 'not equal objects (different sub-property)',
        value1: { a: [{ b: 'c' }] },
        value2: { a: [{ c: 'c' }] },
        expected: false,
      },
      {
        name: 'empty array and empty object are not equal',
        value1: {},
        value2: [],
        expected: false,
      },
      {
        name: 'object with extra undefined properties are not equal #1',
        value1: {},
        value2: { foo: undefined },
        expected: false,
      },
      {
        name: 'object with extra undefined properties are not equal #2',
        value1: { foo: undefined },
        value2: {},
        expected: false,
      },
      {
        name: 'object with extra undefined properties are not equal #3',
        value1: { foo: undefined },
        value2: { bar: undefined },
        expected: false,
      },
    ],
  },

  {
    name: 'arrays',
    tests: [
      {
        name: 'two empty arrays are equal',
        value1: [],
        value2: [],
        expected: true,
      },
      {
        name: 'equal arrays',
        value1: [1, 2, 3],
        value2: [1, 2, 3],
        expected: true,
      },
      {
        name: 'not equal arrays (different item)',
        value1: [1, 2, 3],
        value2: [1, 2, 4],
        expected: false,
      },
      {
        name: 'not equal arrays (different length)',
        value1: [1, 2, 3],
        value2: [1, 2],
        expected: false,
      },
      {
        name: 'equal arrays of objects',
        value1: [{ a: 'a' }, { b: 'b' }],
        value2: [{ a: 'a' }, { b: 'b' }],
        expected: true,
      },
      {
        name: 'not equal arrays of objects',
        value1: [{ a: 'a' }, { b: 'b' }],
        value2: [{ a: 'a' }, { b: 'c' }],
        expected: false,
      },
      {
        name: 'pseudo array and equivalent array are not equal',
        value1: {
          0: 0,
          1: 1,
          length: 2,
        },
        value2: [0, 1],
        expected: false,
      },
      {
        name: 'different sparse arrays are not equal',
        value1: Array.from({ length: 10 }),
        value2: Array.from({ length: 100 }),
        expected: false,
      },
    ],
  },
  {
    name: 'dates',
    tests: [
      {
        name: 'equal date objects',
        value1: new Date('2017-06-16T21:36:48.362Z'),
        value2: new Date('2017-06-16T21:36:48.362Z'),
        expected: true,
      },
      {
        name: 'not equal date objects',
        value1: new Date('2017-06-16T21:36:48.362Z'),
        value2: new Date('2017-01-01T00:00:00.000Z'),
        expected: false,
      },
      {
        name: 'date and string are not equal',
        value1: new Date('2017-06-16T21:36:48.362Z'),
        value2: '2017-06-16T21:36:48.362Z',
        expected: false,
      },
      {
        name: 'date and object are not equal',
        value1: new Date('2017-06-16T21:36:48.362Z'),
        value2: {},
        expected: false,
      },
      {
        name: 'invalid dates are equal',
        value1: new Date('foo'),
        value2: new Date('bar'),
        expected: true,
      },
    ],
  },
  {
    name: 'regexps',
    tests: [
      {
        name: 'equal RegExp objects',
        value1: /foo/,
        value2: /foo/,
        expected: true,
      },
      {
        name: 'not equal RegExp objects (different pattern)',
        value1: /foo/,
        value2: /bar/,
        expected: false,
      },
      {
        name: 'not equal RegExp objects (different flags)',
        value1: /foo/g,
        value2: /foo/i,
        expected: false,
      },
      {
        name: 'equal RegExp objects (different flags "order")',
        value1: /foo/gi,
        // eslint-disable-next-line unicorn/better-regex
        expected: true,
        value2: /foo/gi,
      },
      {
        name: 'RegExp and string are not equal',
        value1: /foo/,
        value2: 'foo',
        expected: false,
      },
      {
        name: 'RegExp and object are not equal',
        value1: /foo/,
        value2: {},
        expected: false,
      },
    ],
  },
  {
    name: 'maps',
    tests: [
      {
        name: 'equal Map objects',
        value1: new Map([['foo', 'bar']]),
        value2: new Map([['foo', 'bar']]),
        expected: true,
      },
      {
        name: 'not equal Map objects (different value)',
        value1: new Map([['foo', 'bar']]),
        value2: new Map([['foo', 'baz']]),
        expected: false,
      },
      {
        name: 'not equal Map objects (different key)',
        value1: new Map([['foo', 'bar']]),
        value2: new Map([['baz', 'bar']]),
        expected: false,
      },
      {
        name: 'not equal Map objects (same keys / values, different pairings)',
        value1: new Map([['foo', 'bar']]),
        value2: new Map([['bar', 'foo']]),
        expected: false,
      },
      {
        name: 'deep equal Map objects',
        value1: new Map([['foo', new Map([['bar', 'baz']])]]),
        value2: new Map([['foo', new Map([['bar', 'baz']])]]),
        expected: true,
      },
      {
        name: 'Map and object are not equal',
        value1: new Map([['foo', 'bar']]),
        value2: { foo: 'bar' },
        expected: false,
      },
      {
        name: 'Map and Set are not equal',
        value1: new Map([['foo', 'foo']]),
        value2: new Set(['foo']),
        expected: false,
      },
    ],
  },
  {
    name: 'sets',
    tests: [
      {
        name: 'equal Set objects',
        value1: new Set(['foo']),
        value2: new Set(['foo']),
        expected: true,
      },
      {
        name: 'not equal Set objects (different value)',
        value1: new Set(['foo']),
        value2: new Set(['bar']),
        expected: false,
      },
      {
        name: 'deep equal Set objects',
        value1: new Set([{ foo: 'bar' }]),
        value2: new Set([{ foo: 'bar' }]),
        expected: true,
      },
      {
        name: 'Set and array are not equal',
        value1: new Set(['foo']),
        value2: ['foo'],
        expected: false,
      },
    ],
  },
  {
    name: 'promises',
    tests: [
      {
        name: 'promises are equal when strictly equal',
        value1: promise,
        value2: promise,
        expected: true,
      },
      {
        name: 'promises are not equal when not strictly equal',
        value1: promise,
        value2: Promise.resolve('foo'),
        expected: false,
      },
    ],
  },
  {
    name: 'react',
    tests: [
      {
        name: 'simple react elements are deeply equal',
        value1: React.createElement('div', {}, 'foo'),
        value2: React.createElement('div', {}, 'foo'),
        expected: true,
      },
      {
        name: 'simple react elements are not deeply equal',
        value1: React.createElement('div', {}, 'foo'),
        value2: React.createElement('div', {}, 'bar'),
        expected: false,
      },
    ],
  },
  {
    name: 'typed arrays',
    tests: [
      {
        name: 'two empty arrays of the same class are equal',
        value1: new Int32Array([]),
        value2: new Int32Array([]),
        expected: true,
      },
      {
        name: 'two empty arrays of the different class are not equal',
        value1: new Int32Array([]),
        value2: new Int16Array([]),
        expected: false,
      },
      {
        name: 'equal Float32Array objects',
        value1: new Float32Array([21, 31]),
        value2: new Float32Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Float32Array objects (different value)',
        value1: new Float32Array([21, 31]),
        value2: new Float32Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Float32Array objects (different TypedArray class)',
        value1: new Float32Array([21, 31]),
        value2: new Float64Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Float64Array objects',
        value1: new Float64Array([21, 31]),
        value2: new Float64Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Float64Array objects (different value)',
        value1: new Float64Array([21, 31]),
        value2: new Float64Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Float64Array objects (different TypedArray class)',
        value1: new Float64Array([21, 31]),
        value2: new Int8Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Int8Array objects',
        value1: new Int8Array([21, 31]),
        value2: new Int8Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Int8Array objects (different value)',
        value1: new Int8Array([21, 31]),
        value2: new Int8Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Int8Array objects (different TypedArray class)',
        value1: new Int8Array([21, 31]),
        value2: new Int16Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Int16Array objects',
        value1: new Int16Array([21, 31]),
        value2: new Int16Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Int16Array objects (different value)',
        value1: new Int16Array([21, 31]),
        value2: new Int16Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Int16Array objects (different TypedArray class)',
        value1: new Int16Array([21, 31]),
        value2: new Int32Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Int32Array objects',
        value1: new Int32Array([21, 31]),
        value2: new Int32Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Int32Array objects (different value)',
        value1: new Int32Array([21, 31]),
        value2: new Int32Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Int32Array objects (different TypedArray class)',
        value1: new Int32Array([21, 31]),
        value2: new Uint8Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Uint8Array objects',
        value1: new Uint8Array([21, 31]),
        value2: new Uint8Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Uint8Array objects (different value)',
        value1: new Uint8Array([21, 31]),
        value2: new Uint8Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Uint8Array objects (different TypedArray class)',
        value1: new Uint8Array([21, 31]),
        value2: new Uint8ClampedArray([21, 31]),
        expected: false,
      },
      {
        name: 'equal Uint8ClampedArray objects',
        value1: new Uint8ClampedArray([21, 31]),
        value2: new Uint8ClampedArray([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Uint8ClampedArray objects (different value)',
        value1: new Uint8ClampedArray([21, 31]),
        value2: new Uint8ClampedArray([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Uint8ClampedArray objects (different TypedArray class)',
        value1: new Uint8ClampedArray([21, 31]),
        value2: new Uint16Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Uint16Array objects',
        value1: new Uint16Array([21, 31]),
        value2: new Uint16Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Uint16Array objects (different value)',
        value1: new Uint16Array([21, 31]),
        value2: new Uint16Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Uint16Array objects (different TypedArray class)',
        value1: new Uint16Array([21, 31]),
        value2: new Uint32Array([21, 31]),
        expected: false,
      },
      {
        name: 'equal Uint32Array objects',
        value1: new Uint32Array([21, 31]),
        value2: new Uint32Array([21, 31]),
        expected: true,
      },
      {
        name: 'not equal Uint32Array objects (different value)',
        value1: new Uint32Array([21, 31]),
        value2: new Uint32Array([31, 21]),
        expected: false,
      },
      {
        name: 'not equal Uint32Array objects (different TypedArray class)',
        value1: new Uint32Array([21, 31]),
        value2: new Float32Array([21, 31]),
        expected: false,
      },
    ],
  },
  {
    name: 'mixed objects equal',
    tests: [
      {
        name: 'big object',
        value1: {
          prop1: 'value1',
          prop2: fn,
          prop3: null,
          prop4: {
            subProp1: 'sub value1',
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [
                1,
                2,
                {
                  prop: 2,
                  prop2: 1,
                },
                4,
                5,
              ],
            },
          },
          prop5: 1000,
          prop6: new Date(2016, 2, 10),
          prop7: /foo/,
        },
        value2: {
          prop1: 'value1',
          prop2: fn,
          prop3: null,
          prop4: {
            subProp1: 'sub value1',
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [
                1,
                2,
                {
                  prop: 2,
                  prop2: 1,
                },
                4,
                5,
              ],
            },
          },
          prop5: 1000,
          prop6: new Date(2016, 2, 10),
          prop7: /foo/,
        },
        expected: true,
      },
    ],
  },
  {
    name: 'mixed objects not equal',
    tests: [
      {
        name: 'big object',
        value1: {
          prop1: 'value1',
          prop2: fn,
          prop3: null,
          prop4: {
            subProp1: 'sub value1',
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [
                1,
                2,
                {
                  prop: 2,
                  prop2: 1,
                },
                4,
                5,
              ],
            },
          },
          prop5: 1000,
          prop6: new Date(2016, 2, 10),
          prop7: /foo/,
        },
        value2: {
          prop1: 'value1',
          prop2: fn,
          prop3: null,
          prop4: {
            subProp1: 'sub value1',
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [
                1,
                2,
                {
                  prop: 2,
                  prop2: 1,
                },
                4,
                5,
              ],
            },
          },
          prop5: 1000,
          prop6: new Date('2017/04/17'),
          prop7: /foo/,
        },
        expected: false,
      },
    ],
  },
];

for (const { name: suiteName, tests } of testSuites) {
  describe(suiteName, () => {
    for (const {
      name: testName, value1, value2, expected,
    } of tests) {
      test(testName, () => {
        expect(isEqual(value1, value2)).toBe(expected);
      });
    }
  });
}
