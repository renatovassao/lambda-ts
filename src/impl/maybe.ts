import { Monad } from "../types/monad";

export class Maybe<T> implements Monad<T> {
  private value?: T;

  public constructor(t?: T) {
    this.value = t;
  }

  public fmap<U>(f: (t: T) => U): Maybe<U> {
    if (this.value) {
      return new Maybe(f(this.value));
    } else {
      return new Maybe();
    }
  }

  public return<U>(t: U): Maybe<U> {
    return new Maybe(t);
  }

  private join<U>(m: Maybe<Maybe<U>>): Maybe<U> {
    return new Maybe(m.value?.value);
  }

  public bind<U>(f: (t: T) => Maybe<U>): Maybe<U> {
    return this.join(this.fmap(f));
  }
}