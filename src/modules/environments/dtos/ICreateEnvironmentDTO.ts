export interface ICreateEnvironmentDTO {
  name: string
  url: string
  appKey: string
  email: string
  password: string
  totp_code?: string
}
