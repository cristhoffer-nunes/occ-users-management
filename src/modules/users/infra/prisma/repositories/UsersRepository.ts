import { PrismaClient } from "@prisma/client"
import { User } from "../../entities/User"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO"

export class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient()
  async create({ email, password, roles }: ICreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        email,
        password,
        roles,
      },
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  }
  async findById(user_id: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    })
    return user
  }
}
