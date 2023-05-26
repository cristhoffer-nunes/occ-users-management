import { ICreateEnvironmentDTO } from "../dtos/ICreateEnvironmentDTO"
import { IUpdateManyEnvironmentsDTO } from "../dtos/IUpdateManyEnvironmentsDTO"
import { Environment } from "../infra/entitities/Environment"

export interface IEnvironmentRepository {
  list(): Promise<Environment[]>
  findByName(name: string): Promise<Environment>
  create(data: ICreateEnvironmentDTO): Promise<void>
  updateManyEnvironments({
    filter,
    value,
  }: IUpdateManyEnvironmentsDTO): Promise<void>
  deleteByName(name: string): Promise<void>
}
