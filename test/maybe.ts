import { Maybe } from "../src";
import { testLaws } from "./monad";

describe("Maybe monad laws test", () => {
  testLaws(new Maybe());
});
