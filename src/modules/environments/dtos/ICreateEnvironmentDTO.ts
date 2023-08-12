export interface ICreateEnvironmentDTO {
  active: string
  environment: string
  name: string
  url: string
  appKey: string
  email: string
  password: string
  totp_code?: string
}
