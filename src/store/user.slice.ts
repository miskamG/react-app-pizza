import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../helpers/API'
import type { LoginResponse } from '../interfaces/Auth.interface'
import { loadState } from './storage'

export const JWT_PERSISTENT_STATE = 'userData'

export interface UserPersistentState {
  jwt: string | null
}

export interface UserState {
  jwt: string | null
  loginErrorMessage?: string
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
}

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message || 'Ошибка авторизации', {
          cause: error,
        })
      }

      throw new Error('Неизвестная ошибка', {
        cause: error,
      })
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null
    },
    cleanLoginError: (state) => {
      state.loginErrorMessage = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        if (!action.payload) {
          return
        }
        state.jwt = action.payload.access_token
      },
    )
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message
    })
  },
})

export default userSlice.reducer
export const userActions = userSlice.actions
