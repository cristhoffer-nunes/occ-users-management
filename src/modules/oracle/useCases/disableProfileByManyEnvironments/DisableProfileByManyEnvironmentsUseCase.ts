import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { AppError } from "@shared/errors/AppErrors"
import { TOTPGenerator } from "@shared/utils/TOTPGenerator"
import { inject, injectable } from "tsyringe"

interface IRequest {
  email: string
}

@injectable()
export class DisableProfileByManyEnvironmentsUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ email }: IRequest) {
    const profileArray: Profile[] = []
    const isJbq = email.indexOf("jbq") > -1

    if (!isJbq) {
      throw new AppError("The email reported does not belong to JBQ.")
    }

    const environments = await this.environmentsRepository.list()

    for (let i = 0; i < environments.length; i++) {
      const isPRD = environments[i].environment === "PRD"
      const adminActive = environments[i].active === "A"

      if (!isPRD && adminActive) {
        const token = await this.profilesRepository.mfaLogin({
          url: environments[i].url,
          email: environments[i].email,
          password: environments[i].password,
          totp_code: environments[i].totp_code,
        })

        const profile = await this.profilesRepository.findByEmail({
          email: email,
          url: environments[i].url,
          token: token,
        })

        if (profile != undefined && profile.active) {
          const updateProfile = await this.profilesRepository.disable({
            user_id: profile.id,
            url: environments[i].url,
            token: token,
          })

          const profileUpdated: Profile = {
            id: updateProfile.id,
            environment: environments[i].name,
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            email: updateProfile.email,
            active: updateProfile.active,
            roles: updateProfile.roles,
          }

          profileArray.push(profileUpdated)
        }
      } else if (isPRD && adminActive) {
        const totpCode = TOTPGenerator(environments[i].secretKey)

        const token = await this.profilesRepository.mfaLogin({
          url: environments[i].url,
          email: environments[i].email,
          password: environments[i].password,
          totp_code: totpCode,
        })

        const profile = await this.profilesRepository.findByEmail({
          email: email,
          url: environments[i].url,
          token: token,
        })

        if (profile != undefined && profile.active) {
          const updateProfile = await this.profilesRepository.disable({
            user_id: profile.id,
            url: environments[i].url,
            token: token,
          })

          const profileUpdated: Profile = {
            id: updateProfile.id,
            environment: environments[i].name,
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            email: updateProfile.email,
            active: updateProfile.active,
            roles: updateProfile.roles,
          }

          profileArray.push(profileUpdated)
        }
      }
    }

    if (profileArray.length == 0) {
      throw new AppError(
        "Profile not registered or not active in any environment."
      )
    } else {
      return profileArray
    }
  }
}
