import speakeasy from "speakeasy"

export function TOTPGenerator(secretKey: string) {
  const currentTime = Math.floor(Date.now() / 1000)
  const totpToken = speakeasy.totp({
    secret: secretKey,
    encoding: "base32",
    time: currentTime,
  })

  return totpToken
}
