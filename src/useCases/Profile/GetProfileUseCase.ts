import { IProfilesRepository } from "../../repositories/Profile/IProfilesRepository"
import { IGetProfileDTO } from "./GetProfileDTO"

export class GetProfileUseCase {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute(data: IGetProfileDTO) {
    const dados = await this.profilesRepository.getProfile(
      data.email,
      data.environment,
      data.token
    )
    return dados
  }
}
