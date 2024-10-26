import type { Get } from 'type-fest';

import type { ObjectPath } from '../../types';
import type { RequireKeysDeep } from '../../types/_internal';
import { isMaliciousObjectProperty } from '../_internal/isMaliciousObjectPath';
import { assert } from '../assert';

/**
 * Sets a value at the specified (possibly nested) path in an object.
 * @template TObject The type of the object.
 * @template Path The type of the path.
 * @param object The object to set the value in.
 * @param path The path to set the value at.
 * @param value The value to set.
 * @example
 * ```ts
 * const object: {
 *   foo?: {
 *     bar?: {
 *       anArray: string[];
 *     };
 *   }
 * };
 *
 * set(object, 'foo.bar.anArray[0]', 'value');
 * object.foo.bar.anArray[0]; // 'value'
 */
export function set<
  TObject extends Record<string, unknown>,
  Path extends ObjectPath<TObject>,
>(
  object: TObject,
  path: Path,
  value: Get<TObject, Path>
): asserts object is TObject & RequireKeysDeep<TObject, Path> {
  const segments = path.match(pathSegmentsRegex);
  assert(segments !== null, 'Invalid path');
  assert(
    segments.every((segment) => isMaliciousObjectProperty(segment) === false),
    'Potentially malicious path'
  );

  // biome-ignore lint/suspicious/noExplicitAny: easier to work with, and we're trusting the compiler
  let currentObject: any = object;
  for (let index = 0; index < segments.length - 1; index++) {
    // biome-ignore lint/style/noNonNullAssertion: trust the compiler (and unit tests 😄).
    const segment = segments[index]!;
    if (segment in currentObject === false) {
      currentObject[segment] = {};
    }
    currentObject = currentObject[segment];
  }

  // biome-ignore lint/style/noNonNullAssertion: this is checked at the type-level
  currentObject[segments.at(-1)!] = value;
}

const pathSegmentsRegex = /[\w-]+/g;
