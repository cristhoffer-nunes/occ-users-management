import { ListProfileController } from "@modules/oracle/useCases/listProfile/ListProfileController"
import { UpdateProfileController } from "@modules/oracle/useCases/updateProfile/UpdateProfileController"
import { Router } from "express"

const profilesRoutes = Router()
const listProfileController = new ListProfileController()
const updateProfileController = new UpdateProfileController()

profilesRoutes.post("/list", listProfileController.handle)
profilesRoutes.put("/update", updateProfileController.handle)

export { profilesRoutes }
