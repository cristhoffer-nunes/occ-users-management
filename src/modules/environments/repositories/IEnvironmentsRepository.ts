import { ICreateEnvironmentDTO } from "../dtos/ICreateEnvironmentDTO"
import { Environment } from "../infra/entitities/Environment"

export interface IEnvironmentRepository {
  create(data: ICreateEnvironmentDTO): Promise<void>
  findByName(name: string): Promise<Environment>
  list(): Promise<Environment[]>
  deleteByName(name: string): Promise<void>
}
