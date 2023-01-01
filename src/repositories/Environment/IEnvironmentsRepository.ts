import { Environment } from "../../entities/Environment/Environment"

export interface IEnvironmentsRepository {
  getEnvironments(): Promise<Environment[]>
}
