/**
 * Slimmed down version of https://github.com/planttheidea/fast-equals
 * Without all the configuration options, and with a few tweaks to make it more readable (though a bit less performant)
 */

import {
  createEqualityComparatorConfig,
  createInternalEqualityComparator,
  createIsEqual,
} from './_internal/comparator';
import { createEqualityComparator } from './_internal/createEqualityComparator';

/**
 * Compare two values to determine if they are deeply equivalent by value.
 * @param value1 The first value to compare.
 * @param value2 The second value to compare.
 * @returns `true` if the two values are equivalent, `false` otherwise.
 * @example
 * ```ts
 * isEqual(1, 1); // true
 * isEqual(1, '1'); // false
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual({ a: 1 }, { a: 2 }); // false
 * isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
 * isEqual(new Set([1, 2, 3]), new Set([3, 2, 1])); // true
 * ```
 */
export const isEqual: IsEqual = createCustomEqual();

/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 * @returns A function that can be used to compare values.
 */
function createCustomEqual() {
  const config = createEqualityComparatorConfig();
  const comparator = createEqualityComparator(config);
  const equals = createInternalEqualityComparator(comparator);

  return createIsEqual({ comparator, equals });
}

type IsEqual = <T1, T2>(value1: T1, value2: T2) => boolean;
