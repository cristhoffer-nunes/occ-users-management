import { CreateProfileController } from "@modules/oracle/useCases/createProfile/CreateProfileController"
import { ListManyProfilesController } from "@modules/oracle/useCases/listManyProfiles/ListManyProfilesController"
import { ListProfileByEmailController } from "@modules/oracle/useCases/listProfileByEmail/ListProfileByEmailController"
import { RequestPasswordResetController } from "@modules/oracle/useCases/requestPasswordReset/RequestPasswordResetController"
import { DisableProfileByManyEnvironmentsController } from "@modules/oracle/useCases/disableProfileByManyEnvironments/DisableProfileByManyEnvironmentsController"
import { UpdateProfileController } from "@modules/oracle/useCases/updateProfile/UpdateProfileController"
import { Router } from "express"
import { ListAllProfilesController } from "@modules/oracle/useCases/listAllProfiles/ListAllProfilesController"

const profilesRoutes = Router()
const listManyProfilesController = new ListManyProfilesController()
const listProfileByEmailController = new ListProfileByEmailController()
const listAllProfilesController = new ListAllProfilesController()
const disableProfileByManyEnvironmentsController =
  new DisableProfileByManyEnvironmentsController()
const updateProfileController = new UpdateProfileController()
const requestPasswordResetController = new RequestPasswordResetController()
const createProfileController = new CreateProfileController()

profilesRoutes.post("/list", listManyProfilesController.handle)
profilesRoutes.post("/listByEmail", listProfileByEmailController.handle)
profilesRoutes.post("/listAll", listAllProfilesController.handle)
profilesRoutes.put(
  "/disableByEnvironments",
  disableProfileByManyEnvironmentsController.handle
)
profilesRoutes.put("/update", updateProfileController.handle)
profilesRoutes.post(
  "/requestPasswordReset",
  requestPasswordResetController.handle
)
profilesRoutes.post("/createProfile", createProfileController.handle)

export { profilesRoutes }
