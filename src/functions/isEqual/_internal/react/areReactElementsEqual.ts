import type { Context } from '../types/types';
import type { Dictionary } from '../object/Dictionary';
import { getObjectProperties } from '../object/getObjectProperties';
import { isReactElement } from './isReactElement';
import { isReactInternalProperty } from './reactInternalProperties';

/**
 * Compare two React elements for equality.
 *
 * React elements are considered equal if they have the same:
 * - $$typeof (React element symbol)
 * - type (component or tag name)
 * - key
 * - props (deep comparison)
 *
 * Internal React properties like _owner, ref, _store, and debug properties
 * are ignored as they can differ between logically equivalent elements.
 */
export function areReactElementsEqual(
  element1: Dictionary,
  element2: Dictionary,
  context: Context
): boolean {
  // Verify both are React elements
  if (!isReactElement(element1) || !isReactElement(element2)) {
    return false;
  }

  // Check $$typeof symbols are identical
  if (element1.$$typeof !== element2.$$typeof) {
    return false;
  }

  const properties1 = getObjectProperties(element1);
  const properties2 = getObjectProperties(element2);

  // Filter out React internal properties for length comparison
  const semanticProps1 = properties1.filter(
    (prop) => !isReactInternalProperty(prop)
  );
  const semanticProps2 = properties2.filter(
    (prop) => !isReactInternalProperty(prop)
  );

  if (semanticProps1.length !== semanticProps2.length) {
    return false;
  }

  // Compare only semantic properties
  for (const property of properties1) {
    // Skip React internal properties
    if (isReactInternalProperty(property)) {
      continue;
    }

    if (!Object.hasOwn(element2, property)) {
      return false;
    }

    if (
      !context.equals(
        element1[property],
        element2[property],
        property,
        property,
        element1,
        element2,
        context
      )
    ) {
      return false;
    }
  }

  return true;
}
