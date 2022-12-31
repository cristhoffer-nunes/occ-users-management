import { User } from "../../entities/User"

export interface IUsersRepository {
  getUser(email: string): Promise<User>
}
