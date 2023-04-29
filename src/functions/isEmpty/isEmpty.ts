import { EmptyObject, Maybe } from '../../types';
import { isArray } from '../isArray';

export function isEmpty(value: string): value is '';
export function isEmpty(value: number): value is number;
export function isEmpty(
  value: Maybe<ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>>
): boolean;
export function isEmpty<T extends ReadonlyArray<unknown> | EmptyArray>(
  value: Maybe<T>
): value is Maybe<T & EmptyArray>;
export function isEmpty<T extends object>(
  value: Maybe<EmptyObject<T> | T>
): value is T & Record<string, never>;
export function isEmpty<T>(value: Maybe<T>): boolean;
export function isEmpty<T>(value: Maybe<T>): boolean {
  if (value == null) {
    return true;
  }

  if (isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'number') {
    return !value;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

type EmptyArray = [];
