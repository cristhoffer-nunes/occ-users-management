export class Environment {
  public id: string
  public name: string
  public url: string
  public appKey: string

  constructor(props: Omit<Environment, "id">) {
    Object.assign(this, props)
  }
}
