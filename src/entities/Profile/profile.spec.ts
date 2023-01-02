import { test, expect } from "vitest"
import { Profile } from "./Profile"

test("Create an profile instance", () => {
  const firstName = "John"
  const lastName = "Doe"
  const ative = true
  const email = "john.doe@mail.com"

  const profile = new Profile(firstName, lastName, ative, email)

  expect(profile).toBeInstanceOf(Profile)
  expect(profile.firstName).toBe("John")
})
