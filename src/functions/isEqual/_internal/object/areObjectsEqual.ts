import { REACT_OWNER_PROPERTY_NAME } from '../react';
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
  const properties = getObjectProperties(value1);

  if (getObjectProperties(value2).length !== properties.length) {
    return false;
  }

  for (const property of properties) {
    if (
      property === REACT_OWNER_PROPERTY_NAME &&
      (value1.$$typeof || value2.$$typeof) &&
      value1.$$typeof !== value2.$$typeof
    ) {
      return false;
    }

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
