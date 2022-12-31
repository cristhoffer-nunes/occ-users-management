import { Request, Response } from "express"
import { GetUserUseCase } from "./GetUserUseCase"

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.body

    const uniqueUser = await this.getUserUseCase.excute(email)

    return response.status(200).json(uniqueUser)
  }
}
