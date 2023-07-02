import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '../../../../src/store/store'

import { authSSOSelector } from './auth-sso.selectors'
import { UpdateTokensType } from './auth-sso.types'

export const setDeviceId = createAction(
  'authSSO/setDeviceId',
  (deviceId: string) => ({
    payload: deviceId,
  }),
)
export const setRefreshToken = createAction(
  'authSSO/setRefreshToken',
  (refreshToken: string) => ({
    payload: refreshToken,
  }),
)
export const updateTokens = createAction(
  'authSSO/updateTokens',
  (tokensData: UpdateTokensType) => {
    localStorage.setItem('accessToken', tokensData.accessToken)
    localStorage.setItem('refreshToken', tokensData.refreshToken)
    return {
      payload: tokensData,
    }
  },
)

export const dropTokens = createAction('authSSO/dropTokens')

export const getAuthRefresh = createAsyncThunk<
  UpdateTokensType | undefined,
  undefined,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>(
  'authSSO/getAuthRefresh',
  async (_: undefined, { dispatch, getState, rejectWithValue }) => {
    const state = getState()

    const { deviceId, refreshToken } = authSSOSelector(state)

    if (deviceId && refreshToken) {
      const body = JSON.stringify({ deviceId, refreshToken })

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SSO_API}/auth.refresh`,
          {
            method: 'POST',
            body,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
          },
        )

        if (response.ok) {
          const { data } = await response.json()
          const result = data as UpdateTokensType

          dispatch(updateTokens(result))

          return result
        } else {
          dispatch(dropTokens())
          return rejectWithValue('SSO auth error')
        }
      } catch {
        dispatch(dropTokens())
        return rejectWithValue('Error')
      }
    } else {
      return rejectWithValue('No refresh token')
    }
  },
)
