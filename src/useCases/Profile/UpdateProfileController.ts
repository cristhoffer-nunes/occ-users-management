import { Request, Response } from "express"
import { GetEnvironmentUseCase } from "../Environment/GetEnvironmentsUseCase"
import { GetSourceClientAdminUseCase } from "../Oracle/GetSourceClientAdminUseCase"
import { IGetProfileDTO } from "./GetProfileDTO"
import { GetProfileUseCase } from "./GetProfileUseCase"
import { IUpdateProfileDTO } from "./UpdateProfileDTO"
import { UpdateProfileUseCase } from "./UpdateProfileUseCase"

export class UpdateProfileController {
  constructor(
    private getProfilesUseCase: GetProfileUseCase,
    private updateProfilesUseCase: UpdateProfileUseCase,
    private getEnvironmentsUseCase: GetEnvironmentUseCase,
    private getSourceClientAdminUseCase: GetSourceClientAdminUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body

      const environments = await this.getEnvironmentsUseCase.execute()

      const profileArray = []

      for (let i = 0; i < environments.length; i++) {
        console.count()
        const token = await this.getSourceClientAdminUseCase.execute(
          environments[i]
        )

        const profileDTO: IGetProfileDTO = {
          email: email,
          environment: environments[i].url,
          token: token,
        }

        const profile = await this.getProfilesUseCase.execute(profileDTO)
        if (profile[0] && profile[0].active == true) {
          const profileId = profile[0].id

          const updateProfileDTO: IUpdateProfileDTO = {
            id: profileId,
            environment: environments[i].url,
            token: token,
          }

          const updateProfile = await this.updateProfilesUseCase.execute(
            updateProfileDTO
          )

          const obj = {
            name: environments[i].name,
            profileInformations: updateProfile,
          }

          profileArray.push(obj)
        }
      }

      return response.status(200).json(profileArray)
    } catch (err) {
      if (err.response) {
        const { status, statusText, data } = err.response
        return response.status(status).json({
          errorCode: status,
          message: statusText,
          data: data,
        })
      } else {
        return response.status(500).json(err.message)
      }
    }
  }
}
