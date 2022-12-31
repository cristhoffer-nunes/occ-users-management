import { Auth } from "../../entities/Auth"

export interface IAuthRepository {
  authenticate(
    id: string,
    email: string,
    password: string,
    hashedPassword: string
  ): Promise<Auth>
}
