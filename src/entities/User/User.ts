export class User {
  public id: string
  public email: string
  public roles: string
  public hashedPassword: string

  constructor(
    id: string,
    email: string,
    roles: string,
    hashedPassword: string
  ) {
    this.id = id
    this.email = email
    this.roles = roles
    this.hashedPassword = hashedPassword
  }
}
