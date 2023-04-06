import { Auth } from "../../entities/Auth/Auth"

export interface IAuthRepository {
  authenticate(
    id: string,
    email: string,
    password: string,
    roles: string,
    hashedPassword: string
  ): Promise<Auth>
}
