import { Monad } from "../types/monad";

export class List<T> implements Monad<T> {
  private items: T[];

  public constructor(...items: T[]) {
    this.items = items;
  }

  public fmap<U>(f: (t: T) => U): List<U> {
    switch (this.items.length) {
      case 0: return new List();
      default:
        const [t] = this.items;
        const ts = this.items.slice(1);

        return new List(f(t), ...new List(...ts).fmap(f).items);
    }
  }

  public return<U>(u: U): List<U> {
    return new List(u);
  }

  private join<U>(l: List<List<U>>): List<U> {
    switch (l.items.length) {
      case 0: return new List();
      default:
        const [t] = l.items;
        const ts = l.items.slice(1);

        return new List(...t.items, ...this.join(new List(...ts)).items);
    }
  }

  public bind<U>(f: (t: T) => List<U>): List<U> {
    return this.join(this.fmap(f));
  }
}