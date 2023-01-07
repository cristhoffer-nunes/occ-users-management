import { IAuthRepository } from "../../repositories/Auth/IAuthRepository"
import { IGetAuthDTO } from "./GetAuthDTO"

export class GetAuthUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: IGetAuthDTO) {
    const auth = await this.authRepository.authenticate(
      data.id,
      data.email,
      data.password,
      data.hashedPassword
    )
    return auth
  }
}
