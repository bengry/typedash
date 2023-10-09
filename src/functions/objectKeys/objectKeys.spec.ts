import { expectTypeOf, it } from 'vitest';

import { objectKeys } from './objectKeys';

it('should be type-safe', () => {
  expectTypeOf(objectKeys({})).toEqualTypeOf<never[]>();
  expectTypeOf(objectKeys({ a: 1 })).toEqualTypeOf<Array<'a'>>();
  expectTypeOf(objectKeys({ a: 1, b: 2 })).toEqualTypeOf<Array<'a' | 'b'>>();
  expectTypeOf(objectKeys({ a: 1, b: 2, c: 3 })).toEqualTypeOf<
    Array<'a' | 'b' | 'c'>
  >();
  expectTypeOf(objectKeys(Object.create(null))).toEqualTypeOf<string[]>();
  expectTypeOf(
    objectKeys({
      a: 1,
      b: 2,
      c: () => 3,
    })
  ).toEqualTypeOf<Array<'a' | 'b' | 'c'>>();

  // Object.keys ignores symbols
  expectTypeOf(
    objectKeys({
      a: 1,
      b: 2,
      [Symbol('test')]: 3,
    })
  ).toEqualTypeOf<Array<'a' | 'b'>>();

  expectTypeOf(
    objectKeys(
      new (class {
        a = 1;

        b = 2;
      })()
    )
  ).toEqualTypeOf<Array<'a' | 'b'>>();
  expectTypeOf(objectKeys({ a: 1, b: 2, c: { d: 3 } })).toEqualTypeOf<
    Array<'a' | 'b' | 'c'>
  >();
  expectTypeOf(objectKeys({ a: 1, b: 2, c: { d: 3 } })).not.toEqualTypeOf<
    Array<'a' | 'b' | 'c' | 'd'>
  >();

  // we can't know the keys of an object with an `any` type
  expectTypeOf(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objectKeys({ a: 1, b: 2, c: { d: 3 } } as any)
  ).not.toEqualTypeOf<Array<'a' | 'b' | 'c' | 'd'>>();
});
