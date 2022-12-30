import express from "express"
import { routerGetProfile } from "../routes/profile"
import { routerGetEnvironments } from "../routes/environment"
import { routerSourceClient } from "../routes/oracle"

const app = express()

app.use(express.json())

app.use(routerGetProfile)
app.use(routerGetEnvironments)
app.use(routerSourceClient)

export { app }
