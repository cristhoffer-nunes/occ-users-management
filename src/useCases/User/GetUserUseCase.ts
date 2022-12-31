import { IUsersRepository } from "../../repositories/User/IUsersRepository"
import { IGetUserDTO } from "./GetUserDTO"

export class GetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IGetUserDTO) {
    const uniqueUser = await this.userRepository.getUser(data.email)

    return uniqueUser
  }
}
