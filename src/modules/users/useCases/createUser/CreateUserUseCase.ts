import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO"
import { AppError } from "@shared/errors/AppErrors"

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password, roles }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      email,
      password: passwordHash,
      roles,
    })
  }
}
