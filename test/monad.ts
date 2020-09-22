import { Monad } from "../src";
import faker from "faker";

function randomA(): unknown {
  switch (faker.random.number(4)) {
    case 0: return faker.random.boolean();
    case 1: return faker.random.number();
    case 2: return faker.random.word();
    case 3: return Array.from({ length: faker.random.number(10) }, _ => 1)
    default: return { [faker.random.word()]: 1 };
  }
}

function randomK<T>(m: Monad<unknown>): (t: T) => Monad<unknown> {
  const key = faker.random.word();
  const length = faker.random.number(10);

  switch (faker.random.number(5)) {
    case 0: return (t: T) => m.return(!!t);
    case 1: return (t: T) => m.return(String(t).length);
    case 2: return (t: T) => m.return(String(t));
    case 3: return (t: T) => m.return(Array.from({ length }, _ => t))
    case 4: return (t: T) => m.return({ [key]: t });
    default: return (t: T) => m.return(t);
  }
}

export function testLaws<T>(m: Monad<T>) {
  test("return a >>= k                  =  k a", () => {
    const a = randomA();
    const k = randomK<typeof a>(m);

    expect(m.return(a).bind(k)).toStrictEqual(k(a));
  });

  test("m        >>= return             =  m", () => {
    expect(m.bind(m.return)).toStrictEqual(m);
  });

  test("m        >>= (\\x -> k x >>= h)  =  (m >>= k) >>= h", () => {
    const k = randomK(m);
    const h = randomK(m);

    expect(m.bind(x => k(x).bind(h))).toStrictEqual(m.bind(k).bind(h));
  });
}