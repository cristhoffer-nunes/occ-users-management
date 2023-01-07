import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface JSONWebToken {
  id: string
  iat: number
  exp: number
}

export async function AuthorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers

    const token = authorization?.split(" ")[1]

    if (token === undefined || token === null) {
      return response
        .status(403)
        .json({ message: "Request denied. Fill in a valid token." })
    }

    const decode = jwt.verify(token, process.env.JWT_PASS ?? "")

    const { id } = decode as JSONWebToken

    request.userId = id

    return next()
  } catch (err) {
    return response.status(400).json(err)
  }
}
