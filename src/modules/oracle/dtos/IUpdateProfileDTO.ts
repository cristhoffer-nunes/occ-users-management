export interface IUpdateProfileDTO {
  url: string
  user_id: string
  token: string
  active?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles?: any[]
}
