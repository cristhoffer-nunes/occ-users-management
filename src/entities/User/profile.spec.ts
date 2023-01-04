import { User } from "./User"

test("Create an profile instance", () => {
  const id = "any_id"
  const email = "john.doe@mail.com"
  const hashedPassword = "hashed_password"

  const user = new User(id, email, hashedPassword)

  expect(user).toBeInstanceOf(User)
  expect(user.hashedPassword).toBe(hashedPassword)
})
