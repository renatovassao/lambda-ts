import { Maybe } from "../src/impl/maybe";
import faker from "faker";

function m<T>(t?: T): Maybe<T> {
  return new Maybe(t);
}

function randomA(): unknown {
  switch (faker.random.number(4)) {
    case 0: return faker.random.boolean();
    case 1: return faker.random.number();
    case 2: return faker.random.word();
    case 3: return Array.from({ length: faker.random.number(10) }, _ => 1)
    case 4: return { [faker.random.word()]: 1 };
  }
}

function randomK<T>(): (t: T) => Maybe<unknown> {
  const key = faker.random.word();
  const length = faker.random.number(10);

  switch (faker.random.number(5)) {
    case 0: return (t: T) => new Maybe(!!t);
    case 1: return (t: T) => new Maybe(String(t).length);
    case 2: return (t: T) => new Maybe(String(t));
    case 3: return (t: T) => new Maybe(Array.from({ length }, _ => t))
    case 4: return (t: T) => new Maybe({ [key]: t });
    default: return (t: T) => new Maybe();
  }
}

describe("Maybe monad laws test", () => {
  test("return a >>= k                  =  k a", () => {
    const a = randomA();
    const k = randomK();

    expect(m(a).bind(k)).toStrictEqual(k(a));
  });

  test("m        >>= return             =  m", () => {
    const a = randomA();

    expect(m(a).bind(m(a).return)).toStrictEqual(m(a));
  });

  test("m        >>= (\\x -> k x >>= h)  =  (m >>= k) >>= h", () => {
    const a = randomA();
    const k = randomK();
    const h = randomK();

    expect(m(a).bind(x => k(x).bind(h))).toStrictEqual(m(a).bind(k).bind(h));
  });
});