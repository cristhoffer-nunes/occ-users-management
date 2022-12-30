import { OracleSourceClientRepository } from "../../repositories/Oracle/implementations/OracleSourceClientRepository"
import { GetSourceClientUseCase } from "./GetSourceClientUseCase"
import { GetSourceClientController } from "./GetSourceClientController"

const oracleSourceClientRepository = new OracleSourceClientRepository()
const getSourceClientUseCase = new GetSourceClientUseCase(
  oracleSourceClientRepository
)
const getSourceClientController = new GetSourceClientController(
  getSourceClientUseCase
)

export { getSourceClientUseCase, getSourceClientController }
