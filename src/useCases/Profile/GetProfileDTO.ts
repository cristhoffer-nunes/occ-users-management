import { Oracle } from "../../entities/Oracle/Oracle"

export interface IGetProfileDTO {
  email: string
  environment: string
  token: Oracle
}
