import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListEnvironmentsUseCase } from "./ListEnvironmentsUseCase"
import { AppError } from "@shared/errors/AppErrors"

export class ListEnvironmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listEnvironmentsUseCase = container.resolve(ListEnvironmentsUseCase)
      const environments = await listEnvironmentsUseCase.execute()

      return response.json(environments)
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        })
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      })
    }
  }
}
