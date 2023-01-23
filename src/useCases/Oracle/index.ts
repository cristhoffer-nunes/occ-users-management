import { OracleSourceClientRepository } from "../../repositories/Oracle/implementations/OracleSourceClientRepository"
import { GetSourceClientUseCase } from "./GetSourceClientUseCase"
import { GetSourceClientAdminUseCase } from "./GetSourceClientAdminUseCase"
import { GetSourceClientController } from "./GetSourceClientController"
import { GetSourceClientAdminController } from "./GetSourceClientAdminController"

const oracleSourceClientRepository = new OracleSourceClientRepository()
const getSourceClientUseCase = new GetSourceClientUseCase(
  oracleSourceClientRepository
)

const getSourceClientAdminUseCase = new GetSourceClientAdminUseCase(
  oracleSourceClientRepository
)

const getSourceClientController = new GetSourceClientController(
  getSourceClientUseCase
)

const getSourceClientAdminController = new GetSourceClientAdminController(
  getSourceClientAdminUseCase
)

export {
  getSourceClientUseCase,
  getSourceClientController,
  getSourceClientAdminUseCase,
  getSourceClientAdminController,
}
