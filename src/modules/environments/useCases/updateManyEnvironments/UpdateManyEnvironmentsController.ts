import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateManyEnvironmentsUseCase } from "./UpdateManyEnvironmentsUseCase"
import { AppError } from "@shared/errors/AppErrors"

export class UpdateManyEnvironmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { filter, value } = request.body

      const updateManyEnvironmentsUseCase = container.resolve(
        UpdateManyEnvironmentsUseCase
      )

      await updateManyEnvironmentsUseCase.execute({ filter, value })

      return response.json({
        message: "Environments has been updated!",
      })
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
