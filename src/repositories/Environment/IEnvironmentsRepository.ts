import { Environment } from "../../entities/Environment"

export interface IEnvironmentsRepository {
  getEnvironments(): Promise<Environment[]>
}
