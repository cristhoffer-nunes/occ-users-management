import { IEnvironmentsRepository } from "../../repositories/Environment/IEnvironmentsRepository"

export class GetEnvironmentUseCase {
  constructor(private environmentsRepository: IEnvironmentsRepository) {}

  async execute() {
    const dados = await this.environmentsRepository.getEnvironments()
    return dados
  }
}
