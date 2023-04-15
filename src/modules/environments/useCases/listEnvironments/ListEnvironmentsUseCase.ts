import { Environment } from "@modules/environments/infra/entitities/Environment"
import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class ListEnvironmentsUseCase {
  constructor(
    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute(): Promise<Environment[]> {
    const environments = await this.environmentsRepository.list()

    return environments
  }
}
