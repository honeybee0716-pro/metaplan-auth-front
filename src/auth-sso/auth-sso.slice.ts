import { createSlice } from '@reduxjs/toolkit'

import {
  dropTokens,
  setDeviceId,
  setRefreshToken,
  updateTokens,
} from './auth-sso.actions'
import { AuthSsoState } from './auth-sso.types'

const initialState: AuthSsoState = {
  deviceId: '',
  accessToken: '',
  refreshToken: '',
}

const authSsoSlice = createSlice({
  name: 'authSSO',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDeviceId, (state, { payload: deviceId }) => {
      state.deviceId = deviceId
    })
    builder.addCase(setRefreshToken, (state, { payload: refreshToken }) => {
      state.refreshToken = refreshToken
    })
    builder.addCase(
      updateTokens,
      (state, { payload: { accessToken, refreshToken } }) => {
        state.accessToken = accessToken
        state.refreshToken = refreshToken
      },
    )
    builder.addCase(dropTokens, (state) => {
      state.accessToken = initialState.accessToken
      state.refreshToken = initialState.refreshToken
    })
  },
})

export default authSsoSlice.reducer
