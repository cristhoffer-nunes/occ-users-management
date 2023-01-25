export class Environment {
  public id: string
  public name: string
  public url: string
  public appKey: string
  public email: string
  public password: string
  public totp_code: string

  constructor(props: Omit<Environment, "id">) {
    Object.assign(this, props)
  }
}
