/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
import { Func } from './types/Func';
import { UnaryFunction } from './types/UnaryFunction';

/**
 * Type-enforcing left-to-right function composition function.
 * The first parameter can be a function of any arity, but the remaining parameters must be unary functions.
 * The return type of one function must be compatible with the argument of next function in the argument list
 *
 * @note The types here are only inferred for the first 20 functions.
 * If you need more, you have to type the functions explicitly.
 * please open an issue, but this should be enough to cover most use cases.
 *
 * @returns A function with the arguments of the *first* function in the argument list and a return type of the *last* function in the argument list
 */
export function pipe<TIn extends unknown[], TOut>(
  f0: Func<TIn, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, T3, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, T3, T4, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, T3, T4, T5, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, T3, T4, T5, T6, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], T1, T2, T3, T4, T5, T6, T7, TOut>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, T16>,
  f16: UnaryFunction<T16, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, T16>,
  f16: UnaryFunction<T16, T17>,
  f17: UnaryFunction<T17, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, T16>,
  f16: UnaryFunction<T16, T17>,
  f17: UnaryFunction<T17, T18>,
  f18: UnaryFunction<T18, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, T16>,
  f16: UnaryFunction<T16, T17>,
  f17: UnaryFunction<T17, T18>,
  f18: UnaryFunction<T18, T19>,
  f19: UnaryFunction<T19, TOut>
): Func<TIn, TOut>;
export function pipe<
  TIn extends unknown[],
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  TOut
>(
  f0: Func<TIn, T1>,
  f1: UnaryFunction<T1, T2>,
  f2: UnaryFunction<T2, T3>,
  f3: UnaryFunction<T3, T4>,
  f4: UnaryFunction<T4, T5>,
  f5: UnaryFunction<T5, T6>,
  f6: UnaryFunction<T6, T7>,
  f7: UnaryFunction<T7, T8>,
  f8: UnaryFunction<T8, T9>,
  f9: UnaryFunction<T9, T10>,
  f10: UnaryFunction<T10, T11>,
  f11: UnaryFunction<T11, T12>,
  f12: UnaryFunction<T12, T13>,
  f13: UnaryFunction<T13, T14>,
  f14: UnaryFunction<T14, T15>,
  f15: UnaryFunction<T15, T16>,
  f16: UnaryFunction<T16, T17>,
  f17: UnaryFunction<T17, T18>,
  f18: UnaryFunction<T18, T19>,
  f19: UnaryFunction<T19, T20>,
  f20: UnaryFunction<T20, TOut>
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], TOut>(
  o1: Func<TIn, any>,
  ...operations: UnaryFunction<any, any>[]
): Func<TIn, TOut>;
export function pipe<TIn extends unknown[], TOut>(
  o1: Func<TIn, any>,
  ...operations: UnaryFunction<any, any>[]
): Func<TIn, TOut> {
  return (...argsP: TIn) => operations.reduce((acc, f) => f(acc), o1(...argsP));
}
