import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { inject, injectable } from "tsyringe"

interface IRequest {
  email: string
}

@injectable()
export class ListProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ email }: IRequest): Promise<Profile[]> {
    const profileArray: Profile[] = []

    const environments = await this.environmentsRepository.list()

    for (let i = 0; i < environments.length; i++) {
      const token = await this.profilesRepository.login({
        url: environments[i].url,
        appKey: environments[i].appKey,
      })

      const profile = await this.profilesRepository.findByEmail({
        email: email,
        url: environments[i].url,
        token: token,
      })

      if (profile) {
        profile.environment = environments[i].name
        profileArray.push(profile)
      }
    }

    return profileArray
  }
}
