import { compare } from "bcrypt"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { sign } from "jsonwebtoken"
import { injectable, inject } from "tsyringe"
import { AppError } from "@shared/errors/AppErrors"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    roles: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, process.env.JWT_PASS, {
      subject: user.id,
      expiresIn: "1d",
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        roles: user.roles,
        email: user.email,
      },
    }

    return tokenReturn
  }
}
