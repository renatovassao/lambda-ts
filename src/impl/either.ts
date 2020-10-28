import { Monad } from "../types/monad";

export class Either<T, U> implements Monad<T | U> {
  private left?: T;
  private right?: U;

  public constructor(left?: T, right?: U) {
    this.left = left;
    this.right = right;
  }

  public fmap<V>(f: (u: U) => V): Either<T, V> {
    if (this.right !== undefined) {
      return new Either(this.left, f(this.right))
    }

    return new Either(this.left);
  }

  public return<V>(v: V): Either<T, V> {
    return new Either(this.left, v);
  }

  private join<V, W>(e: Either<T, Either<V, W>>): Either<V, W> {
    return new Either(e.right?.left, e.right?.right);
  }

  public bind<V>(f: (t: U) => Either<T, V>): Either<T, V> {
    return this.join(this.fmap(f));
  }
}