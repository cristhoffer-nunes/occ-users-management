import { Router } from "express"
import { getEnvironmentController } from "../useCases/Environment"

const routerGetEnvironments = Router()

routerGetEnvironments.post("/environments", (req, res) => {
  return getEnvironmentController.handle(req, res)
})

export { routerGetEnvironments }
