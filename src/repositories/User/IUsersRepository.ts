import { User } from "../../entities/User/User"

export interface IUsersRepository {
  getUser(email: string): Promise<User>
}
