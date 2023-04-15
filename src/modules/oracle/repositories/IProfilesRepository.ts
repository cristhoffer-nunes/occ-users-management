import { IFindByEmailDTO } from "../dtos/IFindByEmailDTO"
import { ILoginDTO } from "../dtos/ILoginDTO"
import { IMfaLoginDTO } from "../dtos/IMfaLoginDTO"
import { Profile } from "../infra/entities/Profile"

export interface IProfilesRepository {
  login({ url, appKey }: ILoginDTO): Promise<string>
  mfaLogin({ url, email, password, totp_code }: IMfaLoginDTO): Promise<string>
  findByEmail({ url, email, token }: IFindByEmailDTO): Promise<Profile>
}
