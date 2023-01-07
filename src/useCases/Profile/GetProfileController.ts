import { Request, Response } from "express"
import { GetEnvironmentUseCase } from "../Environment/GetEnvironmentsUseCase"
import { GetSourceClientUseCase } from "../Oracle/GetSourceClientUseCase"
import { IGetProfileDTO } from "./GetProfileDTO"
import { GetProfileUseCase } from "./GetProfileUseCase"

export class GetProfileController {
  constructor(
    private getProfilesUseCase: GetProfileUseCase,
    private getEnvironmentsUseCase: GetEnvironmentUseCase,
    private getSourceClientUseCase: GetSourceClientUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body

      const environments = await this.getEnvironmentsUseCase.execute()

      const profileArray = []

      for (let i = 0; i < environments.length; i++) {
        console.count()
        const token = await this.getSourceClientUseCase.execute(environments[i])

        const profileDTO: IGetProfileDTO = {
          email: email,
          environment: environments[i].url,
          token: token,
        }

        const profile = await this.getProfilesUseCase.execute(profileDTO)

        const profileInformation = profile[0]

        const obj = {
          name: environments[i].name,
          profileInfo:
            profileInformation != undefined
              ? profileInformation
              : `E-mail "${email}" not registered.`,
        }

        profileArray.push(obj)
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
      }
    }
  }
}
