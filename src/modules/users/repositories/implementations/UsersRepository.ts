import { PrismaClient } from "@prisma/client"
import { User } from "../../infra/entities/User"
import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO"

export class UsersRepository implements IUsersRepository {
  async create({ email, password, roles }: ICreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        email,
        password,
        roles,
      },
    })
  }
  private prisma = new PrismaClient()

  async findByEmail(email: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  }
}
