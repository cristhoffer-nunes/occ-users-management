import { Router } from "express"
import { getProfileController } from "../useCases/Profile"
import { AuthorizationMiddleware } from "../middleware/Auth"

const routerGetProfile = Router()

routerGetProfile.post("/profiles", AuthorizationMiddleware, (req, res) => {
  return getProfileController.handle(req, res)
})

export { routerGetProfile }
