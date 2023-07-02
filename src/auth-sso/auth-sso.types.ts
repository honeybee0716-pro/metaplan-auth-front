export interface UpdateTokensType {
  accessToken: string
  refreshToken: string
}
export interface AuthSsoState extends UpdateTokensType {
  deviceId: string
}
