import { CreateEnvironmentController } from "@modules/environments/useCases/createEnvironment/CreateEnvironmentController"
import { Router } from "express"

const environmentsRoutes = Router()
const createEnvironmentController = new CreateEnvironmentController()

environmentsRoutes.post("/", createEnvironmentController.handle)

export { environmentsRoutes }
