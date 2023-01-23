import { Router } from "express"
import {
  getSourceClientController,
  getSourceClientAdminController,
} from "../useCases/Oracle"

const routerSourceClient = Router()
const routerSourceClientAdmin = Router()

routerSourceClient.post("/oracle", (req, res) => {
  return getSourceClientController.handle(req, res)
})

routerSourceClientAdmin.post("/oracleAdmin", (req, res) => {
  return getSourceClientAdminController.handle(req, res)
})

export { routerSourceClient, routerSourceClientAdmin }
