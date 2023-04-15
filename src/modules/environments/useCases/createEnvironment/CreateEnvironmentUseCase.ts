import { ICreateEnvironmentDTO } from "@modules/environments/dtos/ICreateEnvironmentDTO"
import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { AppError } from "@shared/errors/AppErrors"
import { inject, injectable } from "tsyringe"

@injectable()
export class CreateEnvironmentUseCase {
  constructor(
    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({
    name,
    email,
    appKey,
    password,
    url,
    totp_code,
  }: ICreateEnvironmentDTO): Promise<void> {
    const environmentAlreadyExists =
      await this.environmentsRepository.findByName(name)

    if (environmentAlreadyExists) {
      throw new AppError("Environment already exists")
    }

    await this.environmentsRepository.create({
      name,
      email,
      appKey,
      password,
      url,
      totp_code,
    })
  }
}
