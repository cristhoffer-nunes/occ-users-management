import { IEnvironmentsRepository } from "../IEnvironmentsRepository"
import { PrismaClient } from "@prisma/client"
import { Environment } from "../../../entities/Environment"

export class PrismaEnvironmentRepository implements IEnvironmentsRepository {
  private prisma = new PrismaClient({
    log: ["query"],
  })

  async getEnvironments(): Promise<Environment[]> {
    const data = await this.prisma.environment.findMany()

    return data
  }
}
