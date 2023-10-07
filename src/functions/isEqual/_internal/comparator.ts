/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */

import { areArraysEqual } from './array';
import { createIsCircularTypeEqualityComparator } from './createIsCircularTypeEqualityComparator';
import { areDatesEqual } from './date';
import { areMapsEqual } from './map';
import { areObjectsEqual } from './object';
import { arePrimitiveWrappersEqual } from './primitiveWrappers';
import { areRegExpsEqual } from './regExp';
import { areSetsEqual } from './set';
import { areTypedArraysEqual } from './typedArray';
import type {
  ComparatorConfig,
  Context,
  EqualityComparator,
  InternalEqualityComparator,
} from './types';

export const ARGUMENTS_TAG = '[object Arguments]';
export const BOOLEAN_TAG = '[object Boolean]';
export const MAP_TAG = '[object Map]';
export const NUMBER_TAG = '[object Number]';
export const OBJECT_TAG = '[object Object]';
export const STRING_TAG = '[object String]';

export const getTag = Object.prototype.toString.call.bind(
  Object.prototype.toString
) as (a: object) => string;

interface CreateIsEqualOptions {
  comparator: EqualityComparator;
  equals: InternalEqualityComparator;
}

/**
 * Create the configuration object used for building comparators.
 */
export function createEqualityComparatorConfig(): ComparatorConfig {
  return {
    areDatesEqual,
    areRegExpsEqual,
    arePrimitiveWrappersEqual,
    areArraysEqual: createIsCircularTypeEqualityComparator(areArraysEqual),
    areMapsEqual: createIsCircularTypeEqualityComparator(areMapsEqual),
    areObjectsEqual: createIsCircularTypeEqualityComparator(areObjectsEqual),
    areSetsEqual: createIsCircularTypeEqualityComparator(areSetsEqual),
    areTypedArraysEqual,
  };
}

/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
export function createInternalEqualityComparator(
  compare: EqualityComparator
): InternalEqualityComparator {
  return function internalEqualityComparator(
    value1: unknown,
    value2: unknown,
    _indexOrKeyA: unknown,
    _indexOrKeyB: unknown,
    _parentA: unknown,
    _parentB: unknown,
    context: Context
  ) {
    return compare(value1, value2, context);
  };
}

/**
 * Create the `isEqual` function used by the consuming application.
 */
export function createIsEqual({ comparator, equals }: CreateIsEqualOptions) {
  return function isEqual<T1, T2>(value1: T1, value2: T2): boolean {
    return comparator(value1, value2, {
      cache: new WeakMap(),
      equals,
    });
  };
}
