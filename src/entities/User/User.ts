export class User {
  public id: string
  public email: string
  public hashedPassword: string

  constructor(id: string, email: string, hashedPassword: string) {
    this.id = id
    this.email = email
    this.hashedPassword = hashedPassword
  }
}
