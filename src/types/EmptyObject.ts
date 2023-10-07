import type { EmptyObject as UnkeyedEmptyObject } from 'type-fest';

import { IsEqual } from './IsEqual';

export type EmptyObject<T extends object = never> = IsEqual<
  T,
  never
> extends true
  ? UnkeyedEmptyObject
  : KeyedEmptyObject<T>;

export type KeyedEmptyObject<T extends object> = { [K in keyof T]?: never };
