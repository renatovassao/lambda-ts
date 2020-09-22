import { List } from "../src";
import { testLaws } from "./monad";

describe("List monad laws test", () => {
  testLaws(new List());
});
