import axios from "axios"

import { IFindByEmailDTO } from "@modules/oracle/dtos/IFindByEmailDTO"
import { ILoginDTO } from "@modules/oracle/dtos/ILoginDTO"
import { IMfaLoginDTO } from "@modules/oracle/dtos/IMfaLoginDTO"
import { IProfilesRepository } from "@modules/oracle/repositories/IProfilesRepository"
import { Profile } from "../entities/Profile"

export class ProfilesRepository implements IProfilesRepository {
  async login({ url, appKey }: ILoginDTO): Promise<string> {
    const token = await axios.post(
      `${url}/ccadmin/v1/login`,
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
  }
  mfaLogin({ url, email, password, totp_code }: IMfaLoginDTO): Promise<string> {
    throw new Error("Method not implemented.")
  }
  async findByEmail({ url, email, token }: IFindByEmailDTO): Promise<Profile> {
    const { data } = await axios.get(
      `${url}/ccadmin/v1/adminProfiles?q=email eq "${email}"&fields=firstName,lastName,email,active&queryFormat=SCIM`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.items[0]
  }
}
