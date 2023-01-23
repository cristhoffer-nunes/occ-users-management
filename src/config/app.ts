import express from "express"
import { routerGetProfile } from "../routes/profile"
import { routerGetEnvironments } from "../routes/environment"
import { routerSourceClient, routerSourceClientAdmin } from "../routes/oracle"
import { routerUser } from "../routes/user"
import { routerAuth } from "../routes/auth"

const app = express()

app.use(express.json())

app.use(routerGetProfile)
app.use(routerGetEnvironments)
app.use(routerSourceClient)
app.use(routerSourceClientAdmin)
app.use(routerUser)
app.use(routerAuth)

export { app }
