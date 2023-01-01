export class Profile {
  public firstName: string
  public lastName: string
  public ative: boolean
  public email: string

  constructor(
    firstName: string,
    lastName: string,
    ative: boolean,
    email: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.ative = ative
    this.email = email
  }
}
