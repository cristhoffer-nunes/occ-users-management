import { ListProfileController } from "@modules/oracle/useCases/listProfile/ListProfileController"
import { RequestPasswordResetController } from "@modules/oracle/useCases/requestPasswordReset/RequestPasswordResetController"
import { UpdateProfileController } from "@modules/oracle/useCases/updateProfile/UpdateProfileController"
import { Router } from "express"

const profilesRoutes = Router()
const listProfileController = new ListProfileController()
const updateProfileController = new UpdateProfileController()
const requestPasswordResetController = new RequestPasswordResetController()

profilesRoutes.post("/list", listProfileController.handle)
profilesRoutes.put("/update", updateProfileController.handle)
profilesRoutes.post(
  "/requestPasswordReset",
  requestPasswordResetController.handle
)

export { profilesRoutes }
