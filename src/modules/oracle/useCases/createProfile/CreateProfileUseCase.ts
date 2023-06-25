import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { AppError } from "@shared/errors/AppErrors"
import { inject, injectable } from "tsyringe"

interface IRequest {
  firstName: string
  lastName: string
  email: string
  roles: [string]
}

@injectable()
export class CreateProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ firstName, email, lastName, roles }: IRequest) {
    const profileArray = []
    const isJbq = email.indexOf("jbq") > -1

    if (!isJbq) {
      throw new AppError("The email reported does not belong to JBQ.")
    }

    const environments = await this.environmentsRepository.list()

    for (let i = 0; i < environments.length; i++) {
      const isPrd = environments[i].name.indexOf("prd") > -1

      if (!isPrd) {
        const token = await this.profilesRepository.mfaLogin({
          url: environments[i].url,
          email: environments[i].email,
          password: environments[i].password,
          totp_code: environments[i].totp_code,
        })

        const getProfile = await this.profilesRepository.findByEmail({
          url: environments[i].url,
          email: email,
          token: token,
        })

        if (!getProfile) {
          console.log("Entrou" + environments[i].name)
          const profile = await this.profilesRepository.createProfile({
            url: environments[i].url,
            token,
            firstName,
            lastName,
            email,
            roles,
          })

          profileArray.push({
            environments: environments[i].name,
            id: profile.id,
          })
        }
      }
    }

    return profileArray
  }
}
