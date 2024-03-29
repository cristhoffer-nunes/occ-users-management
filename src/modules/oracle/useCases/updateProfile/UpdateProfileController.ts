import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateProfileUseCase } from "./UpdateProfileUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, environmentName, active, roles } = request.body

      const updateProfileUseCase = container.resolve(UpdateProfileUseCase)

      const updateProfile = await updateProfileUseCase.execute({
        email,
        environmentName,
        active,
        roles,
      })

      return response.json(updateProfile)
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        })
      } else if (err instanceof AxiosError) {
        const { status, statusText, config, data } = err.response
        return response.status(status).json({
          statusCode: status,
          message: statusText,
          data: data,
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
