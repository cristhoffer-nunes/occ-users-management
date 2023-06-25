import { ICreateProfileDTO } from "../dtos/ICreateProfileDTO"
import { IFindByEmailDTO } from "../dtos/IFindByEmailDTO"
import { ILoginDTO } from "../dtos/ILoginDTO"
import { IMfaLoginDTO } from "../dtos/IMfaLoginDTO"
import { IRequestPasswordResetDTO } from "../dtos/IRequestPasswordResetDTO"
import { IUpdateProfileDTO } from "../dtos/IUpdateProfileDTO"
import { Profile } from "../infra/entities/Profile"

export interface IProfilesRepository {
  login({ url, appKey }: ILoginDTO): Promise<string>
  mfaLogin({ url, email, password, totp_code }: IMfaLoginDTO): Promise<string>
  requestPasswordReset({
    url,
    email,
    token,
  }: IRequestPasswordResetDTO): Promise<boolean>
  findByEmail({ url, email, token }: IFindByEmailDTO): Promise<Profile>
  createProfile({
    url,
    token,
    firstName,
    lastName,
    email,
    roles,
  }: ICreateProfileDTO): Promise<Profile>
  update({ url, user_id, token }: IUpdateProfileDTO): Promise<Profile>
}
