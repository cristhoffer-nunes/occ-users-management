export class Profile {
  environment?: string
  id: string
  firstName: string
  lastName: string
  active: boolean
  email: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles: any[]
}
