import { Request, Response } from "express"
import { GetEnvironmentUseCase } from "../Environment/GetEnvironmentsUseCase"
import { GetSourceClientAdminUseCase } from "../Oracle/GetSourceClientAdminUseCase"
import { IGetProfileDTO } from "./GetProfileDTO"
import { GetProfileUseCase } from "./GetProfileUseCase"
import { IUpdateProfileDTO } from "./UpdateProfileDTO"
import { UpdateProfileUseCase } from "./UpdateProfileUseCase"
import {
  loggerUpdateProfile,
  loggerProfileNotFound,
  loggerProfileIsAlreadyDisabled,
} from "../../config/logger"

export class UpdateProfileController {
  constructor(
    private getProfilesUseCase: GetProfileUseCase,
    private updateProfilesUseCase: UpdateProfileUseCase,
    private getEnvironmentsUseCase: GetEnvironmentUseCase,
    private getSourceClientAdminUseCase: GetSourceClientAdminUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request
      const { email } = request.body

      const environments = await this.getEnvironmentsUseCase.execute()

      const profileDisabled = []
      const profileIsAlreadyDisabled = []
      const profileNotFound = []

      for (let i = 0; i < environments.length; i++) {
        const isPRD = environments[i].name.indexOf("prd") > -1

        if (!isPRD) {
          const token = await this.getSourceClientAdminUseCase.execute(
            environments[i]
          )

          const profileDTO: IGetProfileDTO = {
            email: email,
            environment: environments[i].url,
            token: token,
          }

          const profile = await this.getProfilesUseCase.execute(profileDTO)

          if (profile[0] && profile[0].active == false) {
            const obj = {
              timestamp: new Date(),
              environment: environments[i].name,
              firstName: profile[0].firstName,
              lastName: profile[0].lastName,
              active: profile[0].active,
              email: profile[0].email,
              message: `Profile ${email} is already disabled`,
            }

            loggerProfileIsAlreadyDisabled.info({
              userRequest: userId,
              environment: environments[i].name,
              firstName: profile[0].firstName,
              lastName: profile[0].lastName,
              active: profile[0].active,
              email: profile[0].email,
              message: `Profile ${email} is already disabled`,
            })

            profileIsAlreadyDisabled.push(obj)
          }

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

            loggerUpdateProfile.info({
              userRequest: userId,
              environment: environments[i].name,
              firstName: updateProfile.firstName,
              lastName: updateProfile.lastName,
              active: updateProfile.active,
              email: updateProfile.email,
              message: `Profile ${email} disabled`,
            })

            const obj = {
              timestamp: new Date(),
              environment: environments[i].name,
              firstName: updateProfile.firstName,
              lastName: updateProfile.lastName,
              active: updateProfile.active,
              email: updateProfile.email,
              message: `Profile ${email} disabled`,
            }

            profileDisabled.push(obj)
          }

          if (!profile[0]) {
            const obj = {
              timestamp: new Date(),
              environment: environments[i].name,
              message: `Profile ${email} not found`,
            }

            loggerProfileNotFound.info({
              userRequest: userId,
              environment: environments[i].name,
              message: `Profile ${email} not found`,
            })

            profileNotFound.push(obj)
          }
        }
      }

      return response
        .status(200)
        .json({ profileIsAlreadyDisabled, profileDisabled, profileNotFound })
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
