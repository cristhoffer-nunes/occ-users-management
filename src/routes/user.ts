import { Router } from "express"
import { AuthorizationMiddleware } from "../middleware/Auth"
import { getUserController } from "../useCases/User"

const routerUser = Router()

routerUser.post("/user", AuthorizationMiddleware, (req, res) => {
  return getUserController.handle(req, res)
})

export { routerUser }
