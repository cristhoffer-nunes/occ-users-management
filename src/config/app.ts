import express from "express"
import { routerGetProfile } from "../routes/profile"
import { routerGetEnvironments } from "../routes/environment"
import { routerSourceClient } from "../routes/oracle"
import { routerUser } from "../routes/user"

const app = express()

app.use(express.json())

app.use(routerGetProfile)
app.use(routerGetEnvironments)
app.use(routerSourceClient)
app.use(routerUser)

export { app }
