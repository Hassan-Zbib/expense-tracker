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
  extraReducers: (builder) => {},
})

export const { reset } = authSlice.actions
export default authSlice.reducer
