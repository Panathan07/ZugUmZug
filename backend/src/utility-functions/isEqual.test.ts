import { describe, expect, test } from "@jest/globals";
import { isEqual } from "./isEqual";
import User from "#game-components/User";

describe("isEqual module -> test whether two objects are equal", () => {
  test("same Objects are equal", () => {
    const object1 = {
      name: "Paul",
      age: 23,
    };
    const object2 = {
      name: "Paul",
      age: 23,
    };
    expect(isEqual(object1, object2)).toBeTruthy();
  });
  test("two different User are not equal", () => {
    const user1 = new User("Paul", "ab59e280c79d37acd19b2aafa63d7874");
    const user2 = new User("Leo", "f99d76d121c98d4b88b65f3956181835");
    expect(!isEqual(user1, user2)).toBeTruthy();
  });
  test("two similar User are not equal", () => {
    const user1 = new User("Paul", "ab59e280c79d37acd19b2aafa63d7874");
    const user2 = new User("Paul", "f99d76d121c98d4b88b65f3956181835");
    expect(!isEqual(user1, user2)).toBeTruthy();
  });
});
// it("should be able to determine whether two objects are equal", () => {
//   const user1 = new User("Paul", "ab59e280c79d37acd19b2aafa63d7874");
//   const user2 = new User("Leo", "f99d76d121c98d4b88b65f3956181835");
//   expect(isEqual(user1, user2)).toBeTruthy();
// });
