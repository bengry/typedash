import type { TypedArray } from 'type-fest';

import { isArray } from '../../isArray';

import {
  ARGUMENTS_TAG,
  BOOLEAN_TAG,
  getTag,
  MAP_TAG,
  NUMBER_TAG,
  OBJECT_TAG,
  STRING_TAG,
} from './comparator';
import { DATE_TAG } from './date';
import { REG_EXP_TAG } from './regExp';
import { SET_TAG } from './set';
import { isTypedArray } from './typedArray';
import type { ComparatorConfig, Context, EqualityComparator } from './types';

/**
 * Create a comparator method based on the type-specific equality comparators passed.
 * @param root0 The configuration object.
 * @param root0.areArraysEqual The array equality comparator.
 * @param root0.areDatesEqual The date equality comparator.
 * @param root0.areMapsEqual The map equality comparator.
 * @param root0.areObjectsEqual The object equality comparator.
 * @param root0.arePrimitiveWrappersEqual The primitive wrapper equality comparator.
 * @param root0.areRegExpsEqual The regular expression equality comparator.
 * @param root0.areSetsEqual The set equality comparator.
 * @param root0.areTypedArraysEqual The typed array equality comparator.
 * @returns The comparator method.
 */
export function createEqualityComparator({
  areArraysEqual,
  areDatesEqual,
  areMapsEqual,
  areObjectsEqual,
  arePrimitiveWrappersEqual,
  areRegExpsEqual,
  areSetsEqual,
  areTypedArraysEqual,
}: ComparatorConfig): EqualityComparator {
  /**
   * compare the value of the two objects and return true if they are equivalent in values
   * @param value1 the first value to compare
   * @param value2 the second value to compare
   * @param context the context object
   * @returns true if the two values are equivalent in values
   */
  return function comparator(
    // biome-ignore lint/suspicious/noExplicitAny: implicit any is necessary for the comparison
    value1: any,
    // biome-ignore lint/suspicious/noExplicitAny: implicit any is necessary for the comparison
    value2: any,
    context: Context
  ): boolean {
    // If the items are strictly equal, no need to do a value comparison.
    if (Object.is(value1, value2) || value1 === value2) {
      return true;
    }

    // Checks are listed in order of commonality of use-case:
    //   1. Common complex object types (plain object, array)
    //   2. Common data values (date, regexp)
    //   3. Less-common complex object types (map, set)
    //   4. Less-common data values (promise, primitive wrappers)
    // Inherently this is both subjective and assumptive, however
    // when reviewing comparable libraries in the wild this order
    // appears to be generally consistent.
    // Constructors should match, otherwise there is potential for false positives
    // between class and subclass or custom object and POJO.
    if (value1?.constructor !== value2?.constructor) {
      return false;
    }

    // `isPlainObject` only checks against the object's own realm. Cross-realm
    // comparisons are rare, and will be handled in the ultimate fallback, so
    // we can avoid capturing the string tag.
    if (value1.constructor === Object) {
      return areObjectsEqual(value1, value2, context);
    }

    // `isArray()` works on subclasses and is cross-realm, so we can avoid capturing
    // the string tag or doing an `instanceof` check.
    if (isArray(value1)) {
      return areArraysEqual(value1, value2, context);
    }

    // `isTypedArray()` works on all possible TypedArray classes, so we can avoid
    // capturing the string tag or comparing against all possible constructors.
    if (isTypedArray?.(value1)) {
      return areTypedArraysEqual(value1 as TypedArray, value2, context);
    }

    // Try to fast-path equality checks for other complex object types in the
    // same realm to avoid capturing the string tag. Strict equality is used
    // instead of `instanceof` because it is more performant for the common
    // use-case. If someone is subclassing a native class, it will be handled
    // with the string tag comparison.
    if (value1.constructor === Date) {
      return areDatesEqual(value1, value2, context);
    }

    if (value1.constructor === RegExp) {
      return areRegExpsEqual(value1, value2, context);
    }

    if (value1.constructor === Map) {
      return areMapsEqual(value1, value2, context);
    }

    if (value1.constructor === Set) {
      return areSetsEqual(value1, value2, context);
    }

    // Since this is a custom object, capture the string tag to determine its type.
    const tag = getTag(value1);
    switch (tag) {
      case DATE_TAG: {
        return areDatesEqual(value1, value2, context);
      }
      case REG_EXP_TAG: {
        return areRegExpsEqual(value1, value2, context);
      }
      case MAP_TAG: {
        return areMapsEqual(value1, value2, context);
      }
      case SET_TAG: {
        return areSetsEqual(value1, value2, context);
      }
      case OBJECT_TAG: {
        // The exception for value comparison is custom `Promise`-like class instances. These should
        // be treated the same as standard `Promise` objects, which means strict equality, and if
        // it reaches this point then that strict equality comparison has already failed.
        return (
          typeof value1.then !== 'function' &&
          typeof value2.then !== 'function' &&
          areObjectsEqual(value1, value2, context)
        );
      }
      // If an arguments tag, it should be treated as a standard object.
      case ARGUMENTS_TAG: {
        return areObjectsEqual(value1, value2, context);
      }
      // As the penultimate fallback, check if the values passed are primitive wrappers. This
      // is very rare in modern JS, which is why it is deprioritized compared to all other object
      // types.
      case BOOLEAN_TAG:
      case NUMBER_TAG:
      case STRING_TAG: {
        return arePrimitiveWrappersEqual(value1, value2, context);
      }
      // If not matching any tags that require a specific type of comparison, then we hard-code false because
      // the only thing remaining is strict equality, which has already been compared. This is for a few reasons:
      //   - Certain types that cannot be introspected (e.g., `WeakMap`). For these types, this is the only
      //     comparison that can be made.
      //   - For types that can be introspected, but rarely have requirements to be compared
      //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
      //     use-cases (may be included in a future release, if requested enough).
      //   - For types that can be introspected but do not have an objective definition of what
      //     equality is (`Error`, etc.), the subjective decision is to be conservative and strictly compare.
      // In all cases, these decisions should be reevaluated based on changes to the language and
      // common development practices.
      default: {
        return false;
      }
    }
  };
}
