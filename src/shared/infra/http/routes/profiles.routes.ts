import { CreateProfileController } from "@modules/oracle/useCases/createProfile/CreateProfileController"
import { ListManyProfilesController } from "@modules/oracle/useCases/listManyProfiles/ListManyProfilesController"
import { RequestPasswordResetController } from "@modules/oracle/useCases/requestPasswordReset/RequestPasswordResetController"
import { UpdateManyProfilesController } from "@modules/oracle/useCases/updateManyProfiles/UpdateManyProfilesController"
import { Router } from "express"

const profilesRoutes = Router()
const listManyProfilesController = new ListManyProfilesController()
const updateManyProfilesController = new UpdateManyProfilesController()
const requestPasswordResetController = new RequestPasswordResetController()
const createProfileController = new CreateProfileController()

profilesRoutes.post("/list", listManyProfilesController.handle)
profilesRoutes.put("/update", updateManyProfilesController.handle)
profilesRoutes.post(
  "/requestPasswordReset",
  requestPasswordResetController.handle
)
profilesRoutes.post("/createProfile", createProfileController.handle)

export { profilesRoutes }
