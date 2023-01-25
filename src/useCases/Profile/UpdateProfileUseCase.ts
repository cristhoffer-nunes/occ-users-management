import { IProfilesRepository } from "../../repositories/Profile/IProfilesRepository"
import { IUpdateProfileDTO } from "./UpdateProfileDTO"

export class UpdateProfileUseCase {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute(data: IUpdateProfileDTO) {
    const dados = await this.profilesRepository.updateProfile(
      data.id,
      data.environment,
      data.token
    )
    return dados
  }
}
