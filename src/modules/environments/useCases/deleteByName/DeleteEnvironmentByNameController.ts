import { Request, Response } from "express"
import { AppError } from "@shared/errors/AppErrors"
import { container } from "tsyringe"
import { DeleteEnvironmentByNameUseCase } from "./DeleteEnvironmentByNameUseCase"

export class DeleteEnvironmentByNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body

      const deleteEnvironmentByNameUseCase = container.resolve(
        DeleteEnvironmentByNameUseCase
      )
      await deleteEnvironmentByNameUseCase.execute(name)

      return response.status(204).send()
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
