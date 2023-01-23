import { PrismaEnvironmentRepository } from "../../repositories/Environment/implementations/PrismaEnvironmentRepository"
import { OracleSourceClientRepository } from "../../repositories/Oracle/implementations/OracleSourceClientRepository"
import { OracleProfilesRepository } from "../../repositories/Profile/implementations/OracleProfileRepository"
import { GetEnvironmentUseCase } from "../Environment/GetEnvironmentsUseCase"
import { GetSourceClientUseCase } from "../Oracle/GetSourceClientUseCase"
import { GetProfileController } from "./GetProfileController"
import { GetProfileUseCase } from "./GetProfileUseCase"

const oracleProfilesRepository = new OracleProfilesRepository()
const oracleSourceClientRepository = new OracleSourceClientRepository()
const prismaEnvironmentRepository = new PrismaEnvironmentRepository()

const getProfileUseCase = new GetProfileUseCase(oracleProfilesRepository)
const getEnvironmentsUseCase = new GetEnvironmentUseCase(
  prismaEnvironmentRepository
)
const getSourceClientUseCase = new GetSourceClientUseCase(
  oracleSourceClientRepository
)

const getProfileController = new GetProfileController(
  getProfileUseCase,
  getEnvironmentsUseCase,
  getSourceClientUseCase
)

export { getProfileUseCase, getProfileController }
