import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  filter: string
  value: string
}

@injectable()
export class UpdateManyEnvironmentsUseCase {
  constructor(
    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ filter, value }: IRequest): Promise<void> {
    await this.environmentsRepository.updateManyEnvironments({
      filter,
      value,
    })
  }
}
