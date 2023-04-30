export function range(end: number): number[];
export function range(start: number, end: number, step?: number): number[];
export function range(startOrEnd: number, end?: number, step = 1): number[] {
  if (step <= 0) {
    return [];
  }

  const calculatedStart = end == null ? 0 : startOrEnd;
  const calculatedEnd = end == null ? startOrEnd : end;

  const result = [];

  for (let index = calculatedStart; index < calculatedEnd; index += step) {
    result.push(index);
  }

  return result;
}
