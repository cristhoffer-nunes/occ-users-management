import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { AppError } from "@shared/errors/AppErrors"
import { inject, injectable } from "tsyringe"

interface IRequest {
  email: string
  environmentName: string
}

@injectable()
export class ListProfileByEmailUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ email, environmentName }: IRequest): Promise<Profile> {
    const environments = await this.environmentsRepository.findByName(
      environmentName
    )

    const token = await this.profilesRepository.login({
      url: environments.url,
      appKey: environments.appKey
    })

    const profile = await this.profilesRepository.findByEmail({
      email: email,
      url: environments.url,
      token: token,
    })

    if (profile != undefined) {
      return profile
    } else {
      throw new AppError("Profile is not registired in this environment.")
    }
  }
}
