import { Functor } from "./functor";

export interface Monad<T> extends Functor<T> {
  return(t: T): Monad<T>;
  bind<U>(f: (t: T) => Monad<U>): Monad<U>;
}