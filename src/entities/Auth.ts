interface IUser {
  id: string
  email: string
}

export class Auth {
  public user: IUser
  public token: string

  constructor(user: IUser, token: string) {
    this.user = user
    this.token = token
  }
}
