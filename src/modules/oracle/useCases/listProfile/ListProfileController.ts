import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListProfileUseCase } from "./ListProfileUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class ListProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body

      const listProfileUseCase = container.resolve(ListProfileUseCase)

      const profiles = await listProfileUseCase.execute({ email })

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
