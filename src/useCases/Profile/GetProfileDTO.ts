import { Oracle } from "../../entities/Oracle"

export interface IGetProfileDTO {
  email: string
  environment: string
  token: Oracle
}
