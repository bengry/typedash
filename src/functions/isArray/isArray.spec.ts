import { expectTypeOf, it } from 'vitest';

import { isArray } from './isArray';

it('should narrow the type of the input value', () => {
  const value: unknown = null;
  if (isArray(value)) {
    expectTypeOf(value).toEqualTypeOf<readonly unknown[]>();
  }

  const value2 = null as unknown as number[] | null;
  if (isArray(value2)) {
    expectTypeOf(value2).toEqualTypeOf<number[]>();
  }

  const value3 = null as unknown as readonly number[] | null;
  if (isArray(value3)) {
    expectTypeOf(value3).toEqualTypeOf<readonly number[]>();
  }

  const value4 = null as unknown as number | number[];
  if (isArray(value4)) {
    expectTypeOf(value4).toEqualTypeOf<number[]>();
  }
});
