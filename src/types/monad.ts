import { Functor } from "./functor";

export interface Monad<T> extends Functor<T> {
  return<U>(u: U): Monad<U>;
  bind<U>(f: (t: T) => Monad<U>): Monad<U>;
}