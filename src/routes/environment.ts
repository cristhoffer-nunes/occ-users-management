import { Router } from "express"
import { AuthorizationMiddleware } from "../middleware/Auth"
import { VerifyRolesMiddleware } from "../middleware/Roles"
import { getEnvironmentController } from "../useCases/Environment"

const routerGetEnvironments = Router()

routerGetEnvironments.get(
  "/environments",
  AuthorizationMiddleware,
  VerifyRolesMiddleware,
  (req, res) => {
    return getEnvironmentController.handle(req, res)
  }
)

export { routerGetEnvironments }
