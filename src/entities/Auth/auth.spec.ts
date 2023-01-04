import { Auth } from "./Auth"

test("Create an auth instance", () => {
  const user = {
    id: "any_id",
    email: "any@mail.com",
  }

  const token = "any_token"

  const auth = new Auth(user, token)
  expect(auth).toBeInstanceOf(Auth)
  expect(auth.token).toEqual("any_token")
})
