import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateManyProfilesUseCase } from "./UpdateManyProfilesUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class UpdateManyProfilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { environmentName, restrict, roles, active } = request.body

      const updateManyProfilesUseCase = container.resolve(
        UpdateManyProfilesUseCase
      )

      const profiles = await updateManyProfilesUseCase.execute({
        environmentName,
        restrict,
        roles,
        active,
      })

      return response.json(profiles)
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
          url: config.url,
          data: data,
        })
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      })
    }
  }
}
