import axios from "axios"
import qs from "qs"

import { IFindByEmailDTO } from "@modules/oracle/dtos/IFindByEmailDTO"
import { ILoginDTO } from "@modules/oracle/dtos/ILoginDTO"
import { IMfaLoginDTO } from "@modules/oracle/dtos/IMfaLoginDTO"
import { IProfilesRepository } from "@modules/oracle/repositories/IProfilesRepository"
import { Profile } from "../entities/Profile"
import { IUpdateProfileDTO } from "@modules/oracle/dtos/IUpdateProfileDTO"
import { IRequestPasswordResetDTO } from "@modules/oracle/dtos/IRequestPasswordResetDTO"
import { ICreateProfileDTO } from "@modules/oracle/dtos/ICreateProfileDTO"

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

  async requestPasswordReset({
    url,
    email,
    token,
  }: IRequestPasswordResetDTO): Promise<boolean> {
    const { data } = await axios.post(
      `${url}/ccadmin/v1/adminProfiles/requestPasswordReset`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data.success
  }
  async mfaLogin({
    url,
    email,
    password,
    totp_code,
  }: IMfaLoginDTO): Promise<string> {
    const data = qs.stringify({
      grant_type: "password",
      username: `${email}`,
      password: `${password}`,
      totp_code: `${totp_code}`,
    })

    const token = await axios.post(`${url}/ccadmin/v1/mfalogin`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (token.status === 200) {
      return token.data.access_token
    }
  }
  async findByEmail({ url, email, token }: IFindByEmailDTO): Promise<Profile> {
    const { data } = await axios.get(
      `${url}/ccadmin/v1/adminProfiles?q=email eq "${email}"&fields=id,firstName,lastName,email,active&queryFormat=SCIM`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data.items[0]
  }

  async createProfile({
    url,
    token,
    firstName,
    lastName,
    email,
    roles,
  }: ICreateProfileDTO): Promise<Profile> {
    const { data } = await axios.post(
      `${url}/ccadmin/v1/adminProfiles`,
      { firstName, lastName, email, roles },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data
  }

  async update({ url, user_id, token }: IUpdateProfileDTO): Promise<Profile> {
    const { data } = await axios.put(
      `${url}/ccadmin/v1/adminProfiles/${user_id}?fields=id,firstName,lastName,email,active&queryFormat=SCIM`,
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
