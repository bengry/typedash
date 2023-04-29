import { AnyFunction, CastToString } from '../../types/internal';

export const objectKeys: ObjectKeys = Object.keys;

interface ObjectKeys {
  <T extends object>(object: Exclude<T, AnyFunction>): CastToString<keyof T>[];
}
