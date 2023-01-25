import { Oracle } from "../../entities/Oracle/Oracle"

export interface IUpdateProfileDTO {
  id: string
  environment: string
  token: Oracle
}
