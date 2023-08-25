import { Router } from "express"
import { CreateProfileController } from "@modules/oracle/useCases/createProfile/CreateProfileController"
import { ListManyProfilesController } from "@modules/oracle/useCases/listManyProfiles/ListManyProfilesController"
import { ListProfileByEmailController } from "@modules/oracle/useCases/listProfileByEmail/ListProfileByEmailController"
import { ListAllProfilesController } from "@modules/oracle/useCases/listAllProfiles/ListAllProfilesController"
import { DisableProfileByManyEnvironmentsController } from "@modules/oracle/useCases/disableProfileByManyEnvironments/DisableProfileByManyEnvironmentsController"
import { UpdateProfileController } from "@modules/oracle/useCases/updateProfile/UpdateProfileController"
import { UpdateManyProfilesController } from "@modules/oracle/useCases/updateManyProfiles/UpdateManyProfilesController"
import { RequestPasswordResetController } from "@modules/oracle/useCases/requestPasswordReset/RequestPasswordResetController"

const profilesRoutes = Router()
const createProfileController = new CreateProfileController()
const listManyProfilesController = new ListManyProfilesController()
const listProfileByEmailController = new ListProfileByEmailController()
const listAllProfilesController = new ListAllProfilesController()
const disableProfileByManyEnvironmentsController =
  new DisableProfileByManyEnvironmentsController()
const updateProfileController = new UpdateProfileController()
const updateManyProfilesController = new UpdateManyProfilesController()
const requestPasswordResetController = new RequestPasswordResetController()

profilesRoutes.post("/list", listManyProfilesController.handle)
profilesRoutes.post("/listByEmail", listProfileByEmailController.handle)
profilesRoutes.post("/listAll", listAllProfilesController.handle)
profilesRoutes.put(
  "/disableByEnvironments",
  disableProfileByManyEnvironmentsController.handle
)
profilesRoutes.put("/update", updateProfileController.handle)
profilesRoutes.put("/updateMany", updateManyProfilesController.handle)
profilesRoutes.post(
  "/requestPasswordReset",
  requestPasswordResetController.handle
)
profilesRoutes.post("/createProfile", createProfileController.handle)

export { profilesRoutes }
