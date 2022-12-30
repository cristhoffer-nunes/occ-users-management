import { Request, Response } from "express"
import { GetSourceClientUseCase } from "./GetSourceClientUseCase"

export class GetSourceClientController {
  constructor(private getSourceClientUseCase: GetSourceClientUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const token = await this.getSourceClientUseCase.execute(data)

    return response.status(200).json(token)
  }
}
