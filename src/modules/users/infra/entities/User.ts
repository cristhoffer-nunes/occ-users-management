import { v4 as uuidv4 } from "uuid"

export class User {
  id?: string
  email: string
  roles: string
  password: string

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
