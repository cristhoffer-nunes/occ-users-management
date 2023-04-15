import { v4 as uuidv4 } from "uuid"

export class Environment {
  id?: string
  name: string
  url: string
  appKey: string
  email: string
  password: string
  totp_code?: string

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
