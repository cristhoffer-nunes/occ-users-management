import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListProfileByEmailUseCase } from "./ListProfileByEmailUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class ListProfileByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, environmentName } = request.body

      const listProfileByEmailUseCase = container.resolve(
        ListProfileByEmailUseCase
      )

      const profiles = await listProfileByEmailUseCase.execute({
        email,
        environmentName,
      })

      return response.json(profiles)
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        })
      } else if (err instanceof AxiosError) {
        const { status, statusText, config } = err.response
        return response.status(status).json({
          statusCode: status,
          message: statusText,
          url: config.url,
        })
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      })
    }
  }
}
