import { Oracle } from "../../entities/Oracle"

export interface IOracleRepository {
  getSourceClient(client: string, appKey: string): Promise<Oracle>
}
