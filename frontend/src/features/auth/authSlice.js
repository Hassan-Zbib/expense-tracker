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
  message: [],
}

// SignUp user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      let res = await authService.register(user)
      return thunkAPI.fulfillWithValue([res.message])
    } catch (error) {
      let message = []
      let err = JSON.parse(error.response.data)
      if (err) {
        for (let key in err) {
          err[key].forEach((mes) => {
            message.push(mes)
          })
        }
      } else {
        message.push(error.toString())
      }
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    let message = []
    let err = error.response.data

    if (err.error) {
      message = [`${err.error}`]
    } else {
      if (err) {
        for (let key in err) {
          err[key].forEach((mes) => {
            message.push(mes)
          })
        }
      } else {
        message.push(error.toString())
      }
    }

    return thunkAPI.rejectWithValue(message)
  }
})

// Update user
export const update = createAsyncThunk(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      let res = await authService.update(userData, token)
      return thunkAPI.fulfillWithValue([res.message])
    } catch (error) {
      let message = []
      let err = error.response.data
      if (err) {
        for (let key in err.errors) {
          err.errors[key].forEach((mes) => {
            message.push(mes)
          })
        }
      } else {
        message.push(error.toString())
      }
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user
export const get = createAsyncThunk("user/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    let res = await authService.get(token)
    return thunkAPI.fulfillWithValue(res)
  } catch (error) {
    return thunkAPI.rejectWithValue([
      "Something Went Wrong, Please Try to Login Again",
    ])
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
      state.message = []
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
        state.message = action.payload
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
