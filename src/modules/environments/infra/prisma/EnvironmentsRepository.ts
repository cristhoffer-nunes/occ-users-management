import { ICreateEnvironmentDTO } from "@modules/environments/dtos/ICreateEnvironmentDTO"
import { IEnvironmentRepository } from "@modules/environments/repositories/IEnvironmentsRepository"
import { Environment } from "../entitities/Environment"
import { PrismaClient } from "@prisma/client"
import { AppError } from "@shared/errors/AppErrors"
import { IUpdateManyEnvironmentsDTO } from "@modules/environments/dtos/IUpdateManyEnvironmentsDTO"
import ShortUniqueId from "short-unique-id"

export class EnvironmentsRepository implements IEnvironmentRepository {
  private prisma = new PrismaClient()

  async updateManyEnvironments({
    filter,
    value,
  }: IUpdateManyEnvironmentsDTO): Promise<void> {
    await this.prisma.environment.updateMany({
      where: {
        name: {
          contains: `${filter}`,
        },
      },
      data: {
        password: value,
      },
    })
  }

  async findByName(name: string): Promise<Environment> {
    const environment = await this.prisma.environment.findUnique({
      where: {
        name: name,
      },
    })

    return environment
  }

  async list(): Promise<Environment[]> {
    const environment = await this.prisma.environment.findMany()

    return environment
  }

  async create({
    active,
    environment,
    appKey,
    email,
    name,
    password,
    url,
    totp_code,
  }: ICreateEnvironmentDTO): Promise<void> {
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()
    const id = String(code)

    await this.prisma.environment.create({
      data: {
        id,
        active,
        environment,
        appKey,
        name,
        email,
        password,
        url,
        totp_code,
      },
    })
  }

  async deleteByName(name: string): Promise<void> {
    const environment = await this.prisma.environment.findUnique({
      where: {
        name: name,
      },
    })

    if (!environment) {
      throw new AppError("Envrionment does not exist")
    }

    await this.prisma.environment.delete({
      where: {
        name: name,
      },
    })
  }
}
