import { Auth } from "../../../entities/Auth/Auth"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

export class BCryptRepository {
  async authenticate(
    id: string,
    email: string,
    roles: string,
    password: string,
    hashedPassword: string
  ): Promise<Auth> {
    const verifyPassword = await bcrypt.compare(password, hashedPassword)

    if (!verifyPassword) {
      throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
      { id: id, email: email, roles: roles },
      process.env.JWT_PASS,
      {
        expiresIn: "8h",
      }
    )

    const authObject: Auth = {
      user: {
        id: id,
        email: email,
      },
      token: token,
    }

    return authObject
  }
}
