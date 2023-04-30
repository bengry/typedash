export function zip<T, U>(first: readonly T[], second: readonly U[]): [T, U][] {
  const result: [T, U][] = [];

  for (let index = 0; index < Math.min(first.length, second.length); index++) {
    result.push([first[index], second[index]]);
  }

  return result;
}
