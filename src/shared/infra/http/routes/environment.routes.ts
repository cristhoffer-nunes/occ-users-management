import { CreateEnvironmentController } from "@modules/environments/useCases/createEnvironment/CreateEnvironmentController"
import { ListEnvironmentsController } from "@modules/environments/useCases/listEnvironments/ListEnvironmentsController"
import { Router } from "express"

const environmentsRoutes = Router()
const createEnvironmentController = new CreateEnvironmentController()
const listEnvironmentsController = new ListEnvironmentsController()

environmentsRoutes.post("/", createEnvironmentController.handle)
environmentsRoutes.get("/", listEnvironmentsController.handle)

export { environmentsRoutes }
