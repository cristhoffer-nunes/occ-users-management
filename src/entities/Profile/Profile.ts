export class Profile {
  public id: string
  public firstName: string
  public lastName: string
  public active: boolean
  public email: string
  public link?: string

  constructor(
    firstName: string,
    lastName: string,
    active: boolean,
    email: string,
    link?: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.active = active
    this.email = email
    this.link = link
  }
}
