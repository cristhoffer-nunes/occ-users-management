import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { AppError } from "@shared/errors/AppErrors"
import { TOTPGenerator } from "@shared/utils/TOTPGenerator"
import { inject, injectable } from "tsyringe"

interface IRequest {
  email: string
  environmentName: string
  active: boolean
  roles: [string]
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ email, environmentName, active, roles }: IRequest) {
    const profileArray: Profile[] = []
    const isJbq = email.indexOf("jbq") > -1

    if (!isJbq) {
      throw new AppError("The email reported does not belong to JBQ.")
    }

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

      profile.roles = profile.roles.map((item) => item.repositoryId)

      const isActive = active !== undefined ? active : profile.active
      const hasRoles = roles !== undefined ? roles : profile.roles

      if (profile != undefined) {
        const updateProfile = await this.profilesRepository.update({
          user_id: profile.id,
          url: environments.url,
          token: token,
          active: isActive,
          roles: hasRoles,
        })

        const profileUpdated: Profile = {
          id: updateProfile.id,
          environment: environments.name,
          firstName: updateProfile.firstName,
          lastName: updateProfile.lastName,
          email: updateProfile.email,
          active: updateProfile.active,
          roles: updateProfile.roles,
        }

        profileArray.push(profileUpdated)
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

      profile.roles = profile.roles.map((item) => item.repositoryId)

      const isActive = active !== undefined ? active : profile.active
      const hasRoles = roles !== undefined ? roles : profile.roles

      if (profile != undefined) {
        const updateProfile = await this.profilesRepository.update({
          user_id: profile.id,
          url: environments.url,
          token: token,
          active: isActive,
          roles: hasRoles,
        })

        const profileUpdated: Profile = {
          id: updateProfile.id,
          environment: environments.name,
          firstName: updateProfile.firstName,
          lastName: updateProfile.lastName,
          email: updateProfile.email,
          active: updateProfile.active,
          roles: updateProfile.roles,
        }

        profileArray.push(profileUpdated)
      }
    }

    return profileArray
  }
}
