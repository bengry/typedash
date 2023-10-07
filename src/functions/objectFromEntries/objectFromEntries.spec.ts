import { expectTypeOf, it } from 'vitest';

import { objectEntries } from '../objectEntries';

import { objectFromEntries } from './objectFromEntries';

it('should allow composing with `objectEntries`', () => {
  const originalObject: Record<'a' | 'b', string> = {
    a: 'A',
    b: 'B',
  };

  const entries = objectEntries(originalObject);

  expectTypeOf(entries).toEqualTypeOf<Array<['a', string] | ['b', string]>>;

  const transformedEntries = entries.map(
    ([key, value]) => [key, value.length] as const
  );

  expectTypeOf(transformedEntries).toEqualTypeOf<
    Array<readonly ['a' | 'b', number]>
  >();

  const modifiedObject = objectFromEntries(transformedEntries);

  expectTypeOf(modifiedObject).toEqualTypeOf<Record<'a' | 'b', number>>();
});
