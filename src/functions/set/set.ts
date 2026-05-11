import type { Get } from 'type-fest';

import type { ObjectPath } from '../../types';
import type { RequireKeysDeep } from '../../types/_internal';
import { assert } from '../assert';

const MALICIOUS_PROPS = new Set(
  Object.getOwnPropertyNames(Object.getPrototypeOf({}))
);

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
    segments.every((segment) => !MALICIOUS_PROPS.has(segment)),
    'Potentially malicious path'
  );

  let currentObject: any = object;
  for (let index = 0; index < segments.length - 1; index++) {
    const segment = segments[index]!;
    if (segment in currentObject === false) {
      currentObject[segment] = Object.create(null) as Record<string, unknown>;
    }
    currentObject = currentObject[segment];
  }

  currentObject[segments.at(-1)!] = value;
}

const pathSegmentsRegex = /[\w-]+/g;
