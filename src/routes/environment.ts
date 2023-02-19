import { Router } from "express"
import { AuthorizationMiddleware } from "../middleware/Auth"
import { getEnvironmentController } from "../useCases/Environment"

const routerGetEnvironments = Router()

routerGetEnvironments.get(
  "/environments",
  AuthorizationMiddleware,
  (req, res) => {
    return getEnvironmentController.handle(req, res)
  }
)

export { routerGetEnvironments }
