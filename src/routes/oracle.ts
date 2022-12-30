import { Router } from "express"
import { getSourceClientController } from "../useCases/Oracle"

const routerSourceClient = Router()

routerSourceClient.post("/oracle", (req, res) => {
  return getSourceClientController.handle(req, res)
})

export { routerSourceClient }
