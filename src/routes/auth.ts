import { Router } from "express"
import { getAuthController } from "../useCases/Auth"

const routerAuth = Router()

routerAuth.post("/authenticate", (req, res) => {
  return getAuthController.handle(req, res)
})

export { routerAuth }
