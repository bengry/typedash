import { Many, Maybe } from '../../types';

import { castArrayIfDefined } from './castArrayIfDefined';

export function castArray<T>(value: null): T[];
export function castArray<T>(value: undefined): T[];
export function castArray<T>(value: readonly T[]): readonly T[];
export function castArray<T>(value: T[]): T[];
export function castArray<T>(
  value: Maybe<
    Many<NonNullable<T>, 'mutable'> | Many<NonNullable<T>, 'immutable'>
  >
): T[];
export function castArray<T>(value: NonNullable<T>): T[];
export function castArray<T>(
  value: Maybe<
    Many<NonNullable<T>, 'mutable'> | Many<NonNullable<T>, 'immutable'>
  >
) {
  return castArrayIfDefined(value ?? []);
}
