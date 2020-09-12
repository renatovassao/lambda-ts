export interface Functor<T> {
  fmap<U>(f: (t: T) => U): Functor<U>;
}