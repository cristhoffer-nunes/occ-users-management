import { PrismaEnvironmentRepository } from "../../repositories/Environment/implementations/PrismaEnvironmentRepository"
import { GetEnvironmentUseCase } from "./GetEnvironmentsUseCase"
import { GetEnvironmentController } from "./GetEnvironmentsController"

const postgresEnvironmentRepository = new PrismaEnvironmentRepository()
const getEnvinronmentsUseCase = new GetEnvironmentUseCase(
  postgresEnvironmentRepository
)
const getEnvironmentController = new GetEnvironmentController(
  getEnvinronmentsUseCase
)

export { getEnvinronmentsUseCase, getEnvironmentController }
