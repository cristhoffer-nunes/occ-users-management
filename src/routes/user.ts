import { Router } from "express"
import { getUserController } from "../useCases/User"

const routerUser = Router()

routerUser.post("/user", (req, res) => {
  return getUserController.handle(req, res)
})

export { routerUser }
