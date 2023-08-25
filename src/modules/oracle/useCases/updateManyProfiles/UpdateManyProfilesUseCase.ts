import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { Profile } from "@modules/oracle/infra/entities/Profile"
import { TOTPGenerator } from "@shared/utils/TOTPGenerator"
import { inject, injectable } from "tsyringe"

interface IRequest {
  environmentName: string
  restrict: [string]
  roles: [string]
  active: boolean
}

@injectable()
export class UpdateManyProfilesUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({
    environmentName,
    active,
    restrict,
    roles,
  }: IRequest): Promise<Profile[]> {
    const environment = await this.environmentsRepository.findByName(
      environmentName
    )
    const isPRD = environment.environment === "PRD"
    const adminActive = environment.active === "A"
    const profileArray = []

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

      for (let i = 0; i < profilesJBQ.length; i++) {
        const emailIncludes = restrict.includes(profilesJBQ[i].email)

        if (!emailIncludes) {
          profilesJBQ[i].roles = profilesJBQ[i].roles.map(
            (item) => item.repositoryId
          )

          const isActive = active !== undefined ? active : profilesJBQ[i].active
          const hasRoles = roles !== undefined ? roles : profilesJBQ[i].roles

          const updateProfile = await this.profilesRepository.update({
            user_id: profilesJBQ[i].id,
            url: environment.url,
            token: token,
            active: isActive,
            roles: hasRoles,
          })

          const profileUpdated: Profile = {
            id: updateProfile.id,
            environment: environment.name,
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
    } else if (!isPRD && adminActive) {
      const token = await this.profilesRepository.mfaLogin({
        url: environment.url,
        email: environment.email,
        password: environment.password,
        totp_code: environment.totp_code,
      })

      const profiles = await this.profilesRepository.findAll({
        url: environment.url,
        token: token,
      })

      const profilesJBQ = profiles.filter((prof) => prof.email.includes("jbq"))

      for (let i = 0; i < profilesJBQ.length; i++) {
        const emailIncludes = restrict.includes(profilesJBQ[i].email)

        if (!emailIncludes) {
          profilesJBQ[i].roles = profilesJBQ[i].roles.map(
            (item) => item.repositoryId
          )

          const isActive = active !== undefined ? active : profilesJBQ[i].active
          const hasRoles = roles !== undefined ? roles : profilesJBQ[i].roles

          const updateProfile = await this.profilesRepository.update({
            user_id: profilesJBQ[i].id,
            url: environment.url,
            token: token,
            active: isActive,
            roles: hasRoles,
          })

          const profileUpdated: Profile = {
            id: updateProfile.id,
            environment: environment.name,
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
}
