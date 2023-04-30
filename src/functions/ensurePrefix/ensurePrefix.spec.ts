import { expect, it } from 'vitest';

import { ensurePrefix } from './ensurePrefix';

it('should return the string with the prefix if it does not start with the prefix', () => {
  expect(ensurePrefix('foo', 'bar')).toEqual('barfoo');
});

it('should return the string if it already starts with the prefix', () => {
  expect(ensurePrefix('foobar', 'foo')).toEqual('foobar');
});

it('should handle empty strings', () => {
  expect(ensurePrefix('', 'foo')).toEqual('foo');
  expect(ensurePrefix('', '')).toEqual('');
});
