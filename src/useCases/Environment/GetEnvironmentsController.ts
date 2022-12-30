import { GetEnvironmentUseCase } from "./GetEnvironmentsUseCase"
import { Request, Response } from "express"

export class GetEnvironmentController {
  constructor(private getEnvinronmentsUseCase: GetEnvironmentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const environments = await this.getEnvinronmentsUseCase.execute()

    return response.status(200).json(environments)
  }
}
