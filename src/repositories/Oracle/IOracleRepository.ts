import { Oracle } from "../../entities/Oracle/Oracle"
export interface IOracleRepository {
  getSourceClient(client: string, appKey: string): Promise<Oracle>
  getSourceClientAdmin(
    client: string,
    email: string,
    password: string,
    topt_code: string
  ): Promise<Oracle>
}
