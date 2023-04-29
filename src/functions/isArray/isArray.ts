import { Many } from '../../types/Many';

/**
 * The same as `Array.isArray` but with a better type guard.
 */
// eslint-disable-next-line prefer-destructuring
export const isArray: IsArray = Array.isArray;

interface IsArray {
  <T>(value: Many<T>): value is readonly T[];
}
