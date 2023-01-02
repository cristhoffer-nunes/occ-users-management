import { test, expect } from "vitest"
import { Oracle } from "./Oracle"

test("Create an auth instance", () => {
  const token = "any_token"

  const tokenOracle = new Oracle(token)
  expect(tokenOracle).toBeInstanceOf(Oracle)
  expect(tokenOracle.token).toEqual("any_token")
})
