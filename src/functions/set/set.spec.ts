import { expect, it } from 'vitest';

import { set } from './set';

it('should set a value at the root level', () => {
  const object = {
    foo: 'bar',
  };
  set(object, 'foo', 'baz');

  expect(object).toEqual({ foo: 'baz' });
});

it('should set a value at a nested level', () => {
  const object = {
    foo: {
      bar: 'baz',
    },
  };
  set(object, 'foo.bar', 'qux');
  expect(object).toEqual({
    foo: {
      bar: 'qux',
    },
  });
});

it('should create missing objects when setting a value at a nested level', () => {
  const object: {
    foo?: {
      bar?: {
        baz?: string;
      };
    };
  } = {};

  set(object, 'foo.bar.baz', 'qux');
  expect(object).toEqual({
    foo: {
      bar: {
        baz: 'qux',
      },
    },
  });
});

it('should set a value at an array index inside an object', () => {
  const object = {
    foo: {
      bar: ['baz', 'qux'],
    },
  };

  set(object, 'foo.bar[1]', 'quux');
  expect(object).toEqual({
    foo: {
      bar: ['baz', 'quux'],
    },
  });
});
