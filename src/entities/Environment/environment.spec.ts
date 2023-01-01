import { test, expect } from "vitest"
import { Environment } from "./Environment"

test("Create an environment instance", () => {
  const props = {
    id: "any_id",
    name: "any_name",
    url: "any_url",
    appKey: "any_app_key",
  }

  const environment = new Environment(props)
  expect(environment).toBeInstanceOf(Environment)
  expect(environment).toEqual({
    id: "any_id",
    name: "any_name",
    url: "any_url",
    appKey: "any_app_key",
  })
})
