import { Router } from "express"
import { AuthorizationMiddleware } from "../middleware/Auth"
import { VerifyRolesMiddleware } from "../middleware/Roles"
import { getUserController } from "../useCases/User"

const routerUser = Router()

routerUser.post(
  "/user",
  AuthorizationMiddleware,
  VerifyRolesMiddleware,
  (req, res) => {
    return getUserController.handle(req, res)
  }
)

export { routerUser }
