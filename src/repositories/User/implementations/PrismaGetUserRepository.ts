import { PrismaClient } from "@prisma/client"
import { User } from "../../../entities/User"

export class PrismaGetUserRepository {
  private prisma = new PrismaClient({
    log: ["query"],
  })

  async getUser(email: string): Promise<User> {
    const uniqueUser = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return uniqueUser
  }
}
