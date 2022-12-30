import { Profile } from "../../../entities/Profile"
import { IProfilesRepository } from "../IProfilesRepository"
import { Oracle } from "../../../entities/Oracle"
import axios from "axios"

export class OracleProfilesRepository implements IProfilesRepository {
  async getProfile(
    email: string,
    environment: string,
    token: Oracle
  ): Promise<Profile[]> {
    const { data } = await axios.get(
      `${environment}/ccadmin/v1/adminProfiles?q=email eq "${email}"&fields=firstName,lastName,email,active&queryFormat=SCIM`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.items
  }
}
