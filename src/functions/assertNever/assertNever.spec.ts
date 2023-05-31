import { expect, expectTypeOf, it } from 'vitest';

import { assertNever } from './assertNever';

it('should throw an error with an invalid argument', () => {
  expect(() => assertNever('invalid' as never)).toThrowError(
    'Unexpected inclusive value: invalid'
  );
});

it('should not throw an error when `noThrow` argument is `true`', () => {
  expect(() => assertNever('invalid' as never, true)).not.toThrow();
});

it('should help verify exhaustiveness', () => {
  enum Color {
    Red,
    Green,
    Blue,
  }

  // eslint-disable-next-line consistent-return
  function getColorName(color: Color) {
    switch (color) {
      case Color.Red: {
        return 'red';
      }
      case Color.Green: {
        return 'green';
      }
      case Color.Blue: {
        return 'blue';
      }
      default: {
        expectTypeOf(assertNever(color)).toBeNever();
      }
    }
  }

  expect(getColorName(Color.Red)).toBe('red');
  expect(getColorName(Color.Green)).toBe('green');
  expect(getColorName(Color.Blue)).toBe('blue');
  expect(() => getColorName(3 as Color)).toThrowError(
    'Unexpected inclusive value: 3'
  );
});
