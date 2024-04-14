import type { TypedArray } from 'type-fest';

import { Dictionary } from '../object';
import { PrimitiveWrapper } from '../primitiveWrappers';

import { TypeEqualityComparator } from './types';

export interface ComparatorConfig {
  /**
   * Whether the arrays passed are equal in value. In strict mode, this includes
   * additional properties added to the array.
   */
  areArraysEqual: TypeEqualityComparator<readonly unknown[]>;
  /**
   * Whether the dates passed are equal in value.
   */
  areDatesEqual: TypeEqualityComparator<Date>;
  /**
   * Whether the maps passed are equal in value. In strict mode, this includes
   * additional properties added to the map.
   */
  areMapsEqual: TypeEqualityComparator<ReadonlyMap<unknown, unknown>>;
  /**
   * Whether the objects passed are equal in value. In strict mode, this includes
   * non-enumerable properties added to the map, as well as symbol properties.
   */
  areObjectsEqual: TypeEqualityComparator<Dictionary>;
  /**
   * Whether the primitive wrappers passed are equal in value.
   */
  arePrimitiveWrappersEqual: TypeEqualityComparator<PrimitiveWrapper>;
  /**
   * Whether the regexps passed are equal in value.
   */
  areRegExpsEqual: TypeEqualityComparator<RegExp>;
  /**
   * Whether the sets passed are equal in value. In strict mode, this includes
   * additional properties added to the set.
   */
  areSetsEqual: TypeEqualityComparator<ReadonlySet<unknown>>;
  /**
   * Whether the typed arrays passed are equal in value. In strict mode, this includes
   * additional properties added to the typed array.
   */
  areTypedArraysEqual: TypeEqualityComparator<TypedArray>;
}
