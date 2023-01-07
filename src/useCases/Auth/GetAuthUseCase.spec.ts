import { BCryptRepository } from "../../repositories/Auth/implementations/BCryptRepository"
import { IGetAuthDTO } from "./GetAuthDTO"
import { GetAuthUseCase } from "./GetAuthUseCase"

describe("Authenticate", () => {
  it("Should be authenticate with fail", async () => {
    const authRepository = new BCryptRepository()
    const authUseCase = new GetAuthUseCase(authRepository)

    const authDTO: IGetAuthDTO = {
      id: "any_id",
      email: "any_mail@mail.com",
      password: "any_password",
      hashedPassword: "hashed_password",
    }

    await expect(authUseCase.execute(authDTO)).rejects.toEqual(
      new Error("Invalid credentials")
    )
  })

  it("Should be authenticate with success", async () => {
    const authRepository = new BCryptRepository()
    const authUseCase = new GetAuthUseCase(authRepository)

    const authDTO: IGetAuthDTO = {
      id: "any_id",
      email: "any_email@mail.com",
      password: "Naruto@123",
      hashedPassword:
        "$2b$08$RWBYF5e10ny9/D1UgA0ygO61zrIGdEbaY3ROsSKdLDiPT9D.pryLG",
    }

    const auth = await authUseCase.execute(authDTO)

    expect(auth.user.email).toBe("any_email@mail.com")
    expect(auth.user.id).toBe("any_id")
  })
})
