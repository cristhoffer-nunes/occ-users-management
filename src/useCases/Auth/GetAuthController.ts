import { Request, Response } from "express"
import { GetUserUseCase } from "../User/GetUserUseCase"
import { IGetAuthDTO } from "./GetAuthDTO"
import { GetAuthUseCase } from "./GetAuthUseCase"

export class GetAuthController {
  constructor(
    private getAuthUseCase: GetAuthUseCase,
    private getUserUseCase: GetUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body

      const getUser = await this.getUserUseCase.execute(data)
      if (!getUser) {
        return response.status(400).json({ message: "Invalid credentials" })
      }

      const authDTO: IGetAuthDTO = {
        id: getUser.id,
        email: getUser.email,
        password: data.password,
        hashedPassword: getUser.hashedPassword,
      }

      const auth = await this.getAuthUseCase.execute(authDTO)

      return response.status(200).json(auth)
    } catch (err) {
      return response.json({ message: err.message })
    }
  }
}
