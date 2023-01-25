import { Profile } from "../../../entities/Profile/Profile"
import { IProfilesRepository } from "../IProfilesRepository"
import { Oracle } from "../../../entities/Oracle/Oracle"
import axios from "axios"

export class OracleProfilesRepository implements IProfilesRepository {
  async getProfile(
    email: string,
    environment: string,
    token: Oracle
  ): Promise<Profile[]> {
    const { data } = await axios.get(
      `${environment}/ccadmin/v1/adminProfiles?q=email eq "${email}"&fields=id,firstName,lastName,email,active&queryFormat=SCIM`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.items
  }

  async updateProfile(
    userId: string,
    environment: string,
    token: Oracle
  ): Promise<Profile[]> {
    const { data } = await axios.put(
      `${environment}/ccadmin/v1/adminProfiles/${userId}?fields=id,firstName,lastName,email,active`,
      { active: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data
  }
}
