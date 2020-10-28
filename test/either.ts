import { Either } from "../src";
import { testLaws } from "./monad";

describe("Either monad laws test", () => {
  testLaws(new Either());
});
