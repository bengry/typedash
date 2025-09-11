import { areReactElementsEqual, isReactElement } from '../react';
import type { Context } from '../types/types';

import type { Dictionary } from './Dictionary';
import { getObjectProperties } from './getObjectProperties';

/**
 * Whether the objects are equal in value with strict property checking.
 * @param value1 The first object.
 * @param value2 The second object.
 * @param context The context object.
 * @returns true if the two objects are equal, false otherwise.
 */
export function areObjectsEqual(
  value1: Dictionary,
  value2: Dictionary,
  context: Context
): boolean {
  // Delegate to specialized React element comparator if both are React elements
  if (isReactElement(value1) && isReactElement(value2)) {
    return areReactElementsEqual(value1, value2, context);
  }

  // If only one is a React element, they're not equal
  if (isReactElement(value1) || isReactElement(value2)) {
    return false;
  }

  // Standard object comparison for non-React elements
  const properties = getObjectProperties(value1);

  if (getObjectProperties(value2).length !== properties.length) {
    return false;
  }

  for (const property of properties) {
    if (!Object.hasOwn(value2, property)) {
      return false;
    }

    if (
      !context.equals(
        value1[property],
        value2[property],
        property,
        property,
        value1,
        value2,
        context
      )
    ) {
      return false;
    }
  }

  return true;
}
