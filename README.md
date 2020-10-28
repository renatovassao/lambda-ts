## Functional concepts written in Typescript

### Types
- [Fuctor](/src/types/functor.ts)
- [Monad](/src/types/monad.ts)

### Monad Implementations
- [Maybe](/src/impl/maybe.ts)
- [List](/src/impl/list.ts)
- [Either](/src/impl/either.ts)

### Tests
```bash
$ npm run test maybe

> lambda@1.0.0 test /home/renato/codes/nodejs/lambda-ts
> jest "maybe"

 PASS  test/maybe.ts
  Maybe monad laws test
    ✓ return a >>= k                  =  k a (8 ms)
    ✓ m        >>= return             =  m
    ✓ m        >>= (\x -> k x >>= h)  =  (m >>= k) >>= h (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.788 s, estimated 1 s
Ran all test suites matching /maybe/i
```