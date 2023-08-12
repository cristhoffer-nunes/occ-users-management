import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListManyProfilesUseCase } from "./ListManyProfilesUseCase"
import { AppError } from "@shared/errors/AppErrors"
import { AxiosError } from "axios"

export class ListManyProfilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body

      const listManyProfilesUseCase = container.resolve(ListManyProfilesUseCase)

      const profiles = await listManyProfilesUseCase.execute({ email })

      if (!profiles.length) {
        return response.json({
          message: "Profile not registered in any environment.",
        })
      }

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
