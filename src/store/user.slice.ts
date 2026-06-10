import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../helpers/API'
import type { LoginResponse } from '../interfaces/Auth.interface'
import type { Profile } from '../interfaces/User.interface'
import { loadState } from './storage'
import type { RootState } from './store'

export const JWT_PERSISTENT_STATE = 'userData'

export interface UserPersistentState {
  jwt: string | null
}

export interface UserState {
  jwt: string | null
  loginErrorMessage?: string
  profile?: Profile
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

export const profile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/profile',
  async (_, thunkAPI) => {
    const jwt = thunkAPI.getState().user.jwt

    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return data
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
    builder.addCase(
      profile.fulfilled,
      (state, action) => {
        state.profile = action.payload
      },
    )
  },
})

export default userSlice.reducer
export const userActions = userSlice.actions
