import { Oracle } from "../../entities/Oracle"
import { Profile } from "../../entities/Profile"

export interface IProfilesRepository {
  getProfile(
    email: string,
    environment: string,
    token: Oracle
  ): Promise<Profile[]>
}
