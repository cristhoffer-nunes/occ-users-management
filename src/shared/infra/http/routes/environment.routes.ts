import { CreateEnvironmentController } from "@modules/environments/useCases/createEnvironment/CreateEnvironmentController"
import { DeleteEnvironmentByNameController } from "@modules/environments/useCases/deleteByName/DeleteEnvironmentByNameController"
import { ListEnvironmentsController } from "@modules/environments/useCases/listEnvironments/ListEnvironmentsController"
import { UpdateManyEnvironmentsController } from "@modules/environments/useCases/updateManyEnvironments/UpdateManyEnvironmentsController"
import { Router } from "express"

const environmentsRoutes = Router()
const listEnvironmentsController = new ListEnvironmentsController()
const createEnvironmentController = new CreateEnvironmentController()
const updateManyEnvironmentsController = new UpdateManyEnvironmentsController()
const deleteEnvironmentByNameController =
  new DeleteEnvironmentByNameController()

environmentsRoutes.get("/list", listEnvironmentsController.handle)
environmentsRoutes.post("/create", createEnvironmentController.handle)
environmentsRoutes.put("/updateMany", updateManyEnvironmentsController.handle)
environmentsRoutes.delete("/delete", deleteEnvironmentByNameController.handle)

export { environmentsRoutes }
