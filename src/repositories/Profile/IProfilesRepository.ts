import { Oracle } from "../../entities/Oracle/Oracle"
import { Profile } from "../../entities/Profile/Profile"

export interface IProfilesRepository {
  getProfile(
    email: string,
    environment: string,
    token: Oracle
  ): Promise<Profile[]>
}
