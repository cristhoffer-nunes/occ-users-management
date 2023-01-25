import { Router } from "express"
import {
  getProfileController,
  updateProfileController,
} from "../useCases/Profile"
import { AuthorizationMiddleware } from "../middleware/Auth"

const routerGetProfile = Router()
const routerUpdateProfile = Router()

routerGetProfile.post("/profiles", AuthorizationMiddleware, (req, res) => {
  return getProfileController.handle(req, res)
})

routerUpdateProfile.put("/profiles", AuthorizationMiddleware, (req, res) => {
  return updateProfileController.handle(req, res)
})

export { routerGetProfile, routerUpdateProfile }
