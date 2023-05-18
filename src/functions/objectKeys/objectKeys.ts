import { StringKeyOf } from 'type-fest';

import { AnyFunction } from '../../types/internal';

export const objectKeys: ObjectKeys = Object.keys;

interface ObjectKeys {
  <T extends object>(object: Exclude<T, AnyFunction>): StringKeyOf<T>[];
}
