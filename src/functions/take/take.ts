import { Maybe } from '../../types';

export function take<T>(array: Maybe<readonly T[]>, count: number): T[] {
  if (count <= 0) {
    return [];
  }

  return array?.slice(0, count) ?? [];
}
