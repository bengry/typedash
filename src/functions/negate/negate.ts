// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we need to allow any function arguments
export function negate<T extends (...args: any[]) => boolean>(func: T) {
  return (...args: Parameters<T>) => {
    const result = func(...args);
    return !result;
  };
}
