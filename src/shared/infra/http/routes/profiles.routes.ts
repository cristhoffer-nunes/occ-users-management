import { ListProfileController } from "@modules/oracle/useCases/listProfile/ListProfileController"
import { Router } from "express"

const profilesRoutes = Router()
const listProfileController = new ListProfileController()

profilesRoutes.post("/list", listProfileController.handle)

export { profilesRoutes }
