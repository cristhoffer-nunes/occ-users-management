import { Oracle } from "../../entities/OracleToken"

export interface IOracleRepository {
  getSourceClient(client: string, appKey: string): Promise<Oracle>
}
