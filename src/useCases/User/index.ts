import { PrismaGetUserRepository } from "../../repositories/User/implementations/PrismaGetUserRepository"
import { GetUserUseCase } from "./GetUserUseCase"
import { GetUserController } from "./GetUserController"

const prismaGetUserRepository = new PrismaGetUserRepository()
const getUserUseCase = new GetUserUseCase(prismaGetUserRepository)
const getUserController = new GetUserController(getUserUseCase)

export { getUserUseCase, getUserController }
