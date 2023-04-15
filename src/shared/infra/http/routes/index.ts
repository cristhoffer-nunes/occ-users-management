import { Router } from "express"

import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./user.routes"
import { environmentsRoutes } from "./environment.routes"
import { profilesRoutes } from "./profiles.routes"

const router = Router()

router.use(authenticateRoutes)
router.use(usersRoutes)
router.use("/environments", environmentsRoutes)
router.use("/profiles", profilesRoutes)

export { router }
