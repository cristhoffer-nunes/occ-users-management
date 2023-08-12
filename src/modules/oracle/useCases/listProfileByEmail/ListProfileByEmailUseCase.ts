import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { AppError } from "@shared/errors/AppErrors"
import { TOTPGenerator } from "@shared/utils/TOTPGenerator"
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
    const isPRD = environments.environment === "PRD"
    const adminActive = environments.active === "A"

    if (isPRD && adminActive) {
      const totpCode = TOTPGenerator(environments.secretKey)
      const token = await this.profilesRepository.mfaLogin({
        url: environments.url,
        email: environments.email,
        password: environments.password,
        totp_code: totpCode,
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
    } else if (!isPRD && adminActive) {
      const token = await this.profilesRepository.mfaLogin({
        url: environments.url,
        email: environments.email,
        password: environments.password,
        totp_code: environments.totp_code,
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
}
