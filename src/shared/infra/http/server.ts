import "reflect-metadata"
import "../../container"

import express from "express"
import { router } from "@shared/infra/http/routes"

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000")
})
