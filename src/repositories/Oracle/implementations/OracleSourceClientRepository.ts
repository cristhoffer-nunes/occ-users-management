import axios from "axios"
import { Oracle } from "../../../entities/Oracle/Oracle"
import { IOracleRepository } from "../IOracleRepository"

export class OracleSourceClientRepository implements IOracleRepository {
  async getSourceClient(client: string, appKey: string): Promise<Oracle> {
    try {
      const token = await axios.post(
        `${client}/ccadmin/v1/login`,
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${appKey}`,
          },
        }
      )

      if (token.status === 200) {
        return token.data.access_token
      }
    } catch (err) {
      return err
    }
  }
}
