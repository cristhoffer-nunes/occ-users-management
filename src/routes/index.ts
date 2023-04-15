import { Router } from "express"

import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./user.routes"

const router = Router()

router.use(authenticateRoutes)
router.use(usersRoutes)

export { router }
