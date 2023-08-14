import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListAllProfilesUseCase } from "./ListAllProfilesUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class ListAllProfilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { environmentName } = request.body

      const listAllProfilesUseCase = container.resolve(ListAllProfilesUseCase)

      const profiles = await listAllProfilesUseCase.execute({
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
