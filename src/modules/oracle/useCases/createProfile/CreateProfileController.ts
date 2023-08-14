import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateProfileUseCase } from "./CreateProfileUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class CreateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, roles } = request.body

      const createProfileUseCase = container.resolve(CreateProfileUseCase)

      const created = await createProfileUseCase.execute({
        firstName,
        lastName,
        email,
        roles,
      })

      return response.json(created)
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
