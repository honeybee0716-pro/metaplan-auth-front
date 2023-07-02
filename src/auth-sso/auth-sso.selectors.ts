import { RootState } from '../../../../src/store/store'

export const authSSOSelector = (state: RootState) => state.authSSO

export const isAuthorizedSelector = (state: RootState) =>
  !!state.authSSO.refreshToken
