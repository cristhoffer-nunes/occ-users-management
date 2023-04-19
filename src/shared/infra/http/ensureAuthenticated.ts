import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppErrors"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    const { sub: user_id } = verify(token, process.env.JWT_PASS) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exist", 401)
    }

    request.user = {
      id: user_id,
    }
    next()
  } catch (err) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json(err)
    }

    return response.status(500).json(err)
  }
}
