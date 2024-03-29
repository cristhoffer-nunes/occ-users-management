import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateEnvironmentUseCase } from "./CreateEnvironmentUseCase"
import { AppError } from "@shared/errors/AppErrors"

export class CreateEnvironmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {

      const requiredFields = ['appKey','active','environment','name','email','password','url','totp_code']

      for(const field of requiredFields){
        if(!request.body[field]){
          throw new AppError(`Missing required field: ${field}`)
        }
      }

      const {
        appKey,
        active,
        environment,
        name,
        email,
        password,
        url,
        totp_code,
      } = request.body

      const createEnvironmentUseCase = container.resolve(
        CreateEnvironmentUseCase
      )

      await createEnvironmentUseCase.execute({
        appKey,
        active,
        environment,
        name,
        email,
        password,
        url,
        totp_code,
      })

      return response.status(201).send()
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
