import { PrismaEnvironmentRepository } from "../../repositories/Environment/implementations/PrismaEnvironmentRepository"
import { OracleSourceClientRepository } from "../../repositories/Oracle/implementations/OracleSourceClientRepository"
import { OracleProfilesRepository } from "../../repositories/Profile/implementations/OracleProfileRepository"
import { GetEnvironmentUseCase } from "../Environment/GetEnvironmentsUseCase"
import { GetSourceClientUseCase } from "../Oracle/GetSourceClientUseCase"
import { GetSourceClientAdminUseCase } from "../Oracle/GetSourceClientAdminUseCase"
import { GetProfileController } from "./GetProfileController"
import { GetProfileUseCase } from "./GetProfileUseCase"
import { UpdateProfileUseCase } from "./UpdateProfileUseCase"
import { UpdateProfileController } from "./UpdateProfileController"

const oracleProfilesRepository = new OracleProfilesRepository()
const oracleSourceClientRepository = new OracleSourceClientRepository()
const prismaEnvironmentRepository = new PrismaEnvironmentRepository()

const getProfileUseCase = new GetProfileUseCase(oracleProfilesRepository)
const getEnvironmentsUseCase = new GetEnvironmentUseCase(
  prismaEnvironmentRepository
)
const updateProfileUseCase = new UpdateProfileUseCase(oracleProfilesRepository)
const getSourceClientUseCase = new GetSourceClientUseCase(
  oracleSourceClientRepository
)
const getSourceClientAdminUseCase = new GetSourceClientAdminUseCase(
  oracleSourceClientRepository
)

const getProfileController = new GetProfileController(
  getProfileUseCase,
  getEnvironmentsUseCase,
  getSourceClientUseCase
)
const updateProfileController = new UpdateProfileController(
  getProfileUseCase,
  updateProfileUseCase,
  getEnvironmentsUseCase,
  getSourceClientAdminUseCase
)

export { getProfileController, updateProfileController }
