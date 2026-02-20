import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../api/auth'
import { hasApi, setAuthToken } from '../api/client'

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    if (!hasApi()) return rejectWithValue('API not configured')
    try {
      const payload = await authApi.login(username, password)
      if (payload?.user) {
        if (payload.token) setAuthToken(payload.token)
        return payload.user
      }
      return rejectWithValue(payload?.message ?? 'Login failed')
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data ?? err.message
      return rejectWithValue(msg)
    }
  }
)

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ username, password }, { rejectWithValue }) => {
    if (!hasApi()) return rejectWithValue('API not configured')
    try {
      const payload = await authApi.register(username, password)
      if (payload?.user) {
        if (payload.token) setAuthToken(payload.token)
        return payload.user
      }
      return rejectWithValue(payload?.message ?? 'Registration failed')
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data ?? err.message
      return rejectWithValue(msg)
    }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  if (hasApi()) {
    try {
      await authApi.logout()
    } catch (_) {
      // Still clear client state and token
    }
  }
  setAuthToken(null)
})

const initialState = {
  user: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Login failed'
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Registration failed'
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null
        state.error = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
