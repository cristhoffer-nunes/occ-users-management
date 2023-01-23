import axios from "axios"
import { Oracle } from "../../../entities/Oracle/Oracle"
import { IOracleRepository } from "../IOracleRepository"
import qs from "qs"

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

  async getSourceClientAdmin(
    client: string,
    email: string,
    password: string,
    topt_code: string
  ): Promise<Oracle> {
    const data = qs.stringify({
      grant_type: "password",
      username: `${email}`,
      password: `${password}`,
      totp_code: `${topt_code}`,
    })

    try {
      const token = await axios.post(`${client}/ccadmin/v1/mfalogin`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (token.status === 200) {
        return token.data.access_token
      }
    } catch (err) {
      return err
    }
  }
}
