import { CreateEnvironmentController } from "@modules/environments/useCases/createEnvironment/CreateEnvironmentController"
import { DeleteEnvironmentByNameController } from "@modules/environments/useCases/deleteByName/DeleteEnvironmentByNameController"
import { ListEnvironmentsController } from "@modules/environments/useCases/listEnvironments/ListEnvironmentsController"
import { Router } from "express"

const environmentsRoutes = Router()
const createEnvironmentController = new CreateEnvironmentController()
const listEnvironmentsController = new ListEnvironmentsController()
const deleteEnvironmentByNameController =
  new DeleteEnvironmentByNameController()

environmentsRoutes.post("/", createEnvironmentController.handle)
environmentsRoutes.get("/", listEnvironmentsController.handle)
environmentsRoutes.delete("/", deleteEnvironmentByNameController.handle)

export { environmentsRoutes }
