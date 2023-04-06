import { Request, Response, NextFunction } from "express"

export async function VerifyRolesMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { roles } = request

  switch (roles) {
    case "admin":
      next()
      break
    case "reading":
      return response.status(403).json({
        message: "User does not have the necessary permissions.",
      })
  }
}
