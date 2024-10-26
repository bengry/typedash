// biome-ignore lint/suspicious/noExplicitAny: only used as generic constraints or on purpose
export type AnyFunction<TReturnType = any> = (...args: any[]) => TReturnType;
