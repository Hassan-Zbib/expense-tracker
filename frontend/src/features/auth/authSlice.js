import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  profile: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// SignUp user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user
export const update = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await authService.update(userData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user
export const get = createAsyncThunk("auth/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.accessToken
    let res = await authService.get(token)
    return thunkAPI.fulfillWithValue(res)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.profile = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Side effects
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Login Side effects
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Logout Side effect
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      // Update Side effects
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        state.message = "Profile Updated"
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Side effects
      .addCase(get.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(get.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
