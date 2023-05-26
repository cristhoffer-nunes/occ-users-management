import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { injectable, inject } from "tsyringe"

@injectable()
export class DeleteEnvironmentByNameUseCase {
  constructor(
    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute(name: string): Promise<void> {
    await this.environmentsRepository.deleteByName(name)
  }
}
