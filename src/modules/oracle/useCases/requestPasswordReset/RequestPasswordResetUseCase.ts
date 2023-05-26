import { EnvironmentsRepository } from "@modules/environments/infra/prisma/EnvironmentsRepository"
import { ProfilesRepository } from "@modules/oracle/infra/axios/ProfilesRepository"
import { AppError } from "@shared/errors/AppErrors"
import { injectable, inject } from "tsyringe"

interface IRequest {
  email: string
}

@injectable()
export class RequestPasswordResetUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: ProfilesRepository,

    @inject("EnvironmentsRepository")
    private environmentsRepository: EnvironmentsRepository
  ) {}

  async execute({ email }: IRequest): Promise<boolean> {
    const isJbq = email.indexOf("jbq") > -1

    if (!isJbq) {
      throw new AppError("The email reported does not belong to JBQ.")
    }

    const environments = await this.environmentsRepository.list()

    for (let i = 0; i < environments.length; i++) {
      const isPrd = environments[i].name.indexOf("prd") > -1

      if (!isPrd) {
        const token = await this.profilesRepository.login({
          url: environments[i].url,
          appKey: environments[i].appKey,
        })

        await this.profilesRepository.requestPasswordReset({
          url: environments[i].url,
          email: email,
          token,
        })
      }
    }

    return true
  }
}
