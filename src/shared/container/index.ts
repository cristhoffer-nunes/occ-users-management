import { container } from "tsyringe"

import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository"
import { UsersRepository } from "../../modules/users/infra/prisma/repositories/UsersRepository"
import { IEnvironmentRepository } from "@modules/environments/repositories/IEnvironmentsRepository"
import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IEnvironmentRepository>(
  "EnvironmentsRepository",
  EnvironmentsRepository
)
