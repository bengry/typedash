import type { AnyFunction } from './AnyFunction';

export type NonFunction<T> = Exclude<T, AnyFunction>;
