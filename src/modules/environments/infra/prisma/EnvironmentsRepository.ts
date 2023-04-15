import { ICreateEnvironmentDTO } from "@modules/environments/dtos/ICreateEnvironmentDTO"
import { IEnvironmentRepository } from "@modules/environments/repositories/IEnvironmentsRepository"
import { Environment } from "../entitities/Environment"
import { PrismaClient } from "@prisma/client"

export class EnvironmentsRepository implements IEnvironmentRepository {
  private prisma = new PrismaClient()

  async create({
    appKey,
    email,
    name,
    password,
    url,
    totp_code,
  }: ICreateEnvironmentDTO): Promise<void> {
    await this.prisma.environment.create({
      data: {
        appKey,
        name,
        email,
        password,
        url,
        totp_code,
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
}
