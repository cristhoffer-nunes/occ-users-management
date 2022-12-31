import { BCryptRepository } from "../../repositories/Auth/implementations/BCryptRepository"
import { PrismaGetUserRepository } from "../../repositories/User/implementations/PrismaGetUserRepository"
import { GetAuthUseCase } from "./GetAuthUseCase"
import { GetUserUseCase } from "../User/GetUserUseCase"
import { GetAuthController } from "./GetAuthController"

const bcryptRepository = new BCryptRepository()
const prismaGetUserRepository = new PrismaGetUserRepository()
const getUserUseCase = new GetUserUseCase(prismaGetUserRepository)
const getAuthUseCase = new GetAuthUseCase(bcryptRepository)
const getAuthController = new GetAuthController(getAuthUseCase, getUserUseCase)

export { getAuthUseCase, getAuthController }
