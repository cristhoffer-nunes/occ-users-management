import { Request, Response } from "express"
import { GetSourceClientAdminUseCase } from "./GetSourceClientAdminUseCase"

export class GetSourceClientAdminController {
  constructor(
    private getSourceClienAdmintUseCase: GetSourceClientAdminUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const token = await this.getSourceClienAdmintUseCase.execute(data)

    return response.status(200).json(token)
  }
}
