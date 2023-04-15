import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { container } from "tsyringe"
import { AppError } from "@shared/errors/AppErrors"

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

      const token = await authenticateUserUseCase.execute({
        email,
        password,
      })

      return response.status(200).json(token)
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
