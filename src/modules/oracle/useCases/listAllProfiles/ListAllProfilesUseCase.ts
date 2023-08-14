import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { TOTPGenerator } from "@shared/utils/TOTPGenerator"
import { inject, injectable } from "tsyringe"

interface IRequest {
  environmentName: string
}

@injectable()
export class ListAllProfilesUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ environmentName }: IRequest): Promise<Profile[]> {
    const environment = await this.environmentsRepository.findByName(
      environmentName
    )
    const isPRD = environment.environment === "PRD"
    const adminActive = environment.active === "A"

    if (isPRD && adminActive) {
      const totpCode = TOTPGenerator(environment.secretKey)
      const token = await this.profilesRepository.mfaLogin({
        url: environment.url,
        email: environment.email,
        password: environment.password,
        totp_code: totpCode,
      })

      const profiles = await this.profilesRepository.findAll({
        url: environment.url,
        token: token,
      })

      const profilesJBQ = profiles.filter((prof) => prof.email.includes("jbq"))

      return profilesJBQ
    } else if (!isPRD && adminActive) {
      const token = await this.profilesRepository.login({
        url: environment.url,
        appKey: environment.appKey,
      })

      const profiles = await this.profilesRepository.findAll({
        url: environment.url,
        token: token,
      })

      const profilesJBQ = profiles.filter((prof) => prof.email.includes("jbq"))

      return profilesJBQ
    }
  }
}
