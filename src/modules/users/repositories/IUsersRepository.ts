import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../infra/entities/User"

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(user_id: string): Promise<User>
}
