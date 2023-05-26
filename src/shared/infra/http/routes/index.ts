import { Router } from "express"

import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./user.routes"
import { environmentsRoutes } from "./environment.routes"
import { profilesRoutes } from "./profiles.routes"
import { ensureAuthenticated } from "../ensureAuthenticated"

const router = Router()

router.use(authenticateRoutes)
router.use("/users", ensureAuthenticated, usersRoutes)
router.use("/environments", ensureAuthenticated, environmentsRoutes)
router.use("/profiles", ensureAuthenticated, profilesRoutes)

export { router }
