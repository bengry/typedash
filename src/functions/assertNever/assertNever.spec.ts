import { expect, expectTypeOf, it } from 'vitest';

import { assertNever } from './assertNever';

it('should throw an error with an invalid argument', () => {
  expect(() => assertNever('invalid' as never)).to.throw(
    'Unexpected inclusive value: invalid'
  );
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

  expect(getColorName(Color.Red)).to.equal('red');
  expect(getColorName(Color.Green)).to.equal('green');
  expect(getColorName(Color.Blue)).to.equal('blue');
  expect(() => getColorName(3 as Color)).to.throw(
    'Unexpected inclusive value: 3'
  );
});
