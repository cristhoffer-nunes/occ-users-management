import "reflect-metadata"
import "../../container"
import swaggerFile from "../../../../swagger-output.json"
import { serve, setup } from "swagger-ui-express"

import express from "express"
import { router } from "@shared/infra/http/routes"

const app = express()

app.use(express.json())
app.use(router)
app.use("/api-docs", serve, setup(swaggerFile))

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000")
})
